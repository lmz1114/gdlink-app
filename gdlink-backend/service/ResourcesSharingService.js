// services/itemService.js
const UserDAO = require('../DAO/UserDAO');
const ResourcesSharingDAO = require('../DAO/ResourcesSharingDAO');
const FavouriteDAO = require('../DAO/FavouriteDAO');
const GroupMemberDAO = require('../DAO/GroupMemberDAO');

const NotificationService = require('../service/NotificationService');
const UserLogService = require('../service/UserLogService');

const ResourceSharingService = {

    async getReceiversToShare(shareTo, sharerId, receiverGroups, resource) {
        let receivers;
        switch (shareTo) {
            case "all":
                receivers = await UserDAO.getAllUsers(sharerId);
                break;
            case "lecturers":
                receivers = await UserDAO.getAllLecturer(sharerId);
                break;
            case "students":
                receivers = await UserDAO.getAllStudent(sharerId);
                break;
            case "specific groups":
                let rawReceivers = [];
                for (let groupId of receiverGroups) {
                    const groupMembers = await GroupMemberDAO.getMembersEmailByGroup(groupId);
                    rawReceivers = [...rawReceivers, ...groupMembers];
                }
                receivers = rawReceivers.filter((value, index, self) =>
                    index === self.findIndex((t) => t.email === value.email)
                );
                break;
            default:
                receivers = resource.receivers;
        }
        return receivers;
    },
    
    //new added
    async getUserNameById(userId) {
        try {
            return await ResourcesSharingDAO.getUserNameById(userId);
        } catch (error) {
            console.error('Service Error:', error);
            throw new Error('Failed to retrieve username. Please try again later.');
        }
    },

    //new added
    async getRefNameById(resourceId) {
        try {
            return await ResourcesSharingDAO.getRefNameById(resourceId);
        } catch (error) {
            console.error('Service Error:', error);
            throw new Error('Failed to retrieve resource name. Please try again later.');
        }
    },
    
    async shareResource(sharerId, resource) {
        const { shareTo, receiverGroups, refName } = resource;
        let receivers;
    
        try {
            // Get the receivers for the resource
            receivers = await this.getReceiversToShare(shareTo, sharerId, receiverGroups, resource);
    
            // Share the resource and get the result
            const result = await ResourcesSharingDAO.shareResource(sharerId, resource, receivers);
            const resourceId = result.resourceId;
    
            // Generate notification message
            const username = await this.getUserNameById(sharerId);
            const message = `${username} shared the resource "${refName}" with you.`;
            const userLogMessage = `${username} shared the resource "${refName}".`;
            // Log the action
            await UserLogService.createUserLog(sharerId, userLogMessage);
    
            // Create a notification
            const notificationResult = await NotificationService.createNotification(resourceId, message);
            const notificationId = Number(notificationResult.insertId);
    
            // Notify all receivers
            for (const receiver of receivers) {
                await NotificationService.createUserNotifications(receiver.email, notificationId);
            }
    
            return result;
        } catch (error) {
            console.error('Service Error:', error);
            return {
                error: true,
                message: 'An error occurred while sharing the resource. Please try again later.',
            };
        }
    },
    
    async editResource(userId, resourceId, previousShareTo, previousReceiverGroups, previousReceivers, resource) {
        const { shareTo, receiverGroups, receivers } = resource;
        try {
            // Notification Logic
            const { refName } = resource;
            const username = await this.getUserNameById(userId); // Get actor's name
            const sharer = await NotificationService.getSharerToNotify(resourceId); // Get resource sharer's info
    
            const message = `${username} edited the resource "${refName}".`;
            const messageForSharer = `Your resource "${refName}" has been edited by ${username}.`;
    
            await UserLogService.createUserLog(userId, message);
    
            const notificationResult = await NotificationService.createNotification(resourceId, message);
            const notificationId = Number(notificationResult.insertId);
    
            const receiversToNotify = await NotificationService.getReceiversToNotify(resourceId);
            for (const receiver of receiversToNotify) {
                await NotificationService.createUserNotifications(receiver.email, notificationId);
            }

            if (sharer.email && sharer.id !== userId) {
                const ownerNotificationResult = await NotificationService.createNotification(resourceId, messageForSharer);
                const ownerNotificationId = Number(ownerNotificationResult.insertId);
    
                await NotificationService.createUserNotifications(sharer.email, ownerNotificationId);
            }

            const isGroupSame = (arr1, arr2) => {
                if (arr1.length !== arr2.length) return false;
                const sorted1 = [...arr1].sort();
                const sorted2 = [...arr2].sort();
                return sorted1.every((value, index) => value === sorted2[index]);
            };
    
            const isReceiverSame = (arr1, arr2) => {
                if (arr1.length !== arr2.length) return false;
                const sorted1 = arr1.map(obj => obj.email).sort();
                const sorted2 = arr2.map(obj => obj.email).sort();
                return sorted1.every((value, index) => value === sorted2[index]);
            };
    
            const isShareToSame = previousShareTo === shareTo;
            const isReceiverGroupsSame = isGroupSame(previousReceiverGroups, receiverGroups);
            const isReceiversSame = isReceiverSame(previousReceivers, receivers);
    
            let usersToAdd = [];
            if (!isShareToSame || !isReceiverGroupsSame || !isReceiversSame) {
                // Receivers have changed
                let currentReceivers = await ResourcesSharingDAO.getReceiverEmails(resourceId);
                let newReceivers = await this.getReceiversToShare(shareTo, userId, receiverGroups, resource);
    
                const usersToRemove = currentReceivers.filter(currentReceiver =>
                    !newReceivers.some(newReceiver => newReceiver.email === currentReceiver.email)
                );
    
                const userEmailsToRemove = usersToRemove.map(receiver => receiver.email);
                if (userEmailsToRemove.length > 0) {
                    await ResourcesSharingDAO.deleteSharesWithIN(resourceId, userEmailsToRemove);
                }

                const unshareMessage = `${username} unshared the resource "${refName}" with you.`;
                const unshareNotificationResult = await NotificationService.createNotification(resourceId, unshareMessage);
                const unshareNotificationId = Number(unshareNotificationResult.insertId);
                for (const receiver of usersToRemove) {
                    await NotificationService.createUserNotifications(receiver.email, unshareNotificationId);
                }
    
                usersToAdd = newReceivers.filter(newReceiver =>
                    !currentReceivers.some(currentReceiver => currentReceiver.email === newReceiver.email)
                );

                const shareMessage = `${username} shared the resource "${refName}" with you.`;
                const shareNotificationResult = await NotificationService.createNotification(resourceId, shareMessage);
                const shareNotificationId = Number(shareNotificationResult.insertId);
                for (const receiver of usersToAdd) {
                    await NotificationService.createUserNotifications(receiver.email, shareNotificationId);
                }
            }
    
            const result = await ResourcesSharingDAO.editResource(
                resourceId,
                resource,
                isReceiverGroupsSame,
                previousReceiverGroups,
                usersToAdd
            );
    
            
    
            return result;
        } catch (error) {
            console.error('Error updating resource sharing:', error);
    
            return {
                error: true,
                message: 'An error occurred while updating the resource sharing. Please try again later.',
            };
        }
    },
    

    async deleteResource(userId,resourceId) {
        try {
            // Retrieve necessary data
            const refName = await this.getRefNameById(resourceId);
            const username = await this.getUserNameById(userId);
            const sharer = await NotificationService.getSharerToNotify(resourceId);
            const receivers = await NotificationService.getReceiversToNotify(resourceId);

            // Define notification messages
            const message = `${username} deleted the resource "${refName}".`;
            const messageForSharer = `Your resource "${refName}" has been deleted by ${username}.`;

            // Log user action
            await UserLogService.createUserLog(userId, message);

            // Notify receivers
            const notificationResult = await NotificationService.createNotification(resourceId, message);
            const notificationId = Number(notificationResult.insertId);

            for (const receiver of receivers) {
                await NotificationService.createUserNotifications(receiver.email, notificationId);
            }

            // Notify the owner if they are not the one who deleted the resource
            if (sharer.email && sharer.id !== userId) {
                const ownerNotificationResult = await NotificationService.createNotification(resourceId, messageForSharer);
                const ownerNotificationId = Number(ownerNotificationResult.insertId);

                await NotificationService.createUserNotifications(sharer.email, ownerNotificationId);
            }

            // Now delete the resource from the database
            return await ResourcesSharingDAO.deleteResource(resourceId);

        } catch (error) {
            console.error('Service Error:', error);
            return {
                error: true,
                message: 'An error occurred while deleting the resource. Please try again later.'
            };
        }
    },
    
    async getMyShareLinksResources(sharerId){
        try{
            return await ResourcesSharingDAO.getMyShareLinksResources(sharerId);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getSharedWithMeResources(receiverId){
        try{
            return await ResourcesSharingDAO.getSharedWithMeResources(receiverId);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getFilteredResources(userId,userIdType,categories,semesters){
        try{
            return await ResourcesSharingDAO.getFilteredResources(userId,userIdType,categories,semesters);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getSearchedResources(userId,userIdType,key){
        try{
            return await ResourcesSharingDAO.getSearchedResources(userId,userIdType,key);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getResourceDetails(resourceId,receiverId = null){
        try{
            await ResourcesSharingDAO.updateAccessTime(resourceId, receiverId);
            let resourceDetails = await ResourcesSharingDAO.getResourceDetails(resourceId, receiverId);
            if(receiverId){
                const isFavouriteStatus = await FavouriteDAO.isFavourite(receiverId, resourceId);
                resourceDetails[0].isFavourite = isFavouriteStatus;
            }else{
                resourceDetails = [resourceDetails.reduce((result, item) => {
                    if (!result.resourceId) {
                        result = {
                            resourceId: item.resourceId,
                            link: item.link,
                            description: item.description,
                            refName: item.refName,
                            sessem: item.sessem,
                            owner: item.owner,
                            sharedAt: item.sharedAt,
                            shareTo: item.shareTo,
                            categoryId: item.categoryId,
                            categoryName: item.categoryName,
                            color: item.color,
                            sharerName: item.sharerName,
                            groups: [],
                            receivers: []
                        };
                    }
        
                    if (item.groupId && item.groupName) {
                        result.groups.push({
                            groupId: item.groupId,
                            groupName: item.groupName
                        });
                    }
        
                    if (item.receiverEmail) {
                        result.receivers.push({
                            receiverEmail: item.receiverEmail,
                            receiverName: item.receiverName
                        });
                    }
        
                    return result;
                }, {})];
            }
            return resourceDetails;
        } catch (error) {
            console.error('Service Error:', error);
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getAllResources(){
        try{
            return await ResourcesSharingDAO.getAllResources();
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getFilteredAllResources(categories,semesters){
        try{
            return await ResourcesSharingDAO.getFilteredAllResources(categories,semesters);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async getSearchedAllResources(key){
        try{
            return await ResourcesSharingDAO.getSearchedAllResources(key);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while retrieving the resources. Please try again later.'
            };
        }
    },

    async initUserResources(userEmail, userRole) {
        console.log('email' + userEmail);
        try {
            return await ResourcesSharingDAO.initResources(userEmail, userRole);
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                error: true,
                message: 'An error occurred while initializing the resources. Please try again later.'
            };
        }
    }  
}



module.exports = ResourceSharingService;
