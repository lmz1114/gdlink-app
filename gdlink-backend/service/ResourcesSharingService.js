// services/itemService.js
const UserDAO = require('../DAO/UserDAO');
const ResourcesSharingDAO = require('../DAO/ResourcesSharingDAO');
const FavouriteDAO = require('../DAO/FavouriteDAO');
const GroupMemberDAO = require('../DAO/GroupMemberDAO');

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
                    const groupMembers = await GroupMemberDAO.getMembersIdByGroup(groupId);
                    rawReceivers = [...rawReceivers, ...groupMembers];
                }
                receivers = rawReceivers.filter((value, index, self) =>
                    index === self.findIndex((t) => t.userId === value.userId)
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
        const { shareTo, receiverGroups } = resource;
        let receivers;
        try {
            receivers = await this.getReceiversToShare(shareTo, sharerId, receiverGroups, resource);
            return await ResourcesSharingDAO.shareResource(sharerId, resource, receivers);
    
        } catch (error) {
            console.error('Service Error:', error);
    
            return {
                resourceId: resourceId,
                error: true,
                message: 'An error occurred while sharing the resource. Please try again later.'
            };
        }
    },   

    async editResource(sharerId, resourceId, previousShareTo, previousReceiverGroups, previousReceivers, resource) {
        const { shareTo, receiverGroups, receivers } = resource;
        console.log(previousReceiverGroups.length);
        console.log(previousReceivers);
        console.log(receiverGroups.length);
    
        try {
            let usersToAdd = [];
            const isGroupSame = (arr1, arr2) => {
                if (arr1.length !== arr2.length) return false;
                const sorted1 = [...arr1].sort();
                const sorted2 = [...arr2].sort();
                return sorted1.every((value, index) => value === sorted2[index]);
            };

            const isReceiverSame = (arr1, arr2) => {
                if (arr1.length !== arr2.length) return false;
                const sorted1 = arr1.map(obj => obj.userId).sort();
                const sorted2 = arr2.map(obj => obj.userId).sort();
                return sorted1.every((value, index) => value === sorted2[index]);
            };   
            const isShareToSame = (previousShareTo === shareTo);
            const isReceiverGroupsSame = isGroupSame(previousReceiverGroups,receiverGroups);
            const isReceiversSame = isReceiverSame(previousReceivers,receivers);
            console.log(isReceiversSame);

            if(!isShareToSame || !isReceiverGroupsSame || !isReceiversSame ){
                let currentReceivers = await ResourcesSharingDAO.getReceiverIds(resourceId);
        
                let newReceivers = await this.getReceiversToShare(shareTo, sharerId, receiverGroups, resource);
        
                const usersToRemove = currentReceivers.filter(currentReceiver => 
                    !newReceivers.some(newReceiver => newReceiver.userId === currentReceiver.userId)
                );
        
                const userIdsToRemove = usersToRemove.map(receiver => receiver.userId);
                if (userIdsToRemove.length > 0) {
                    await ResourcesSharingDAO.deleteSharesWithIN(resourceId, userIdsToRemove);
                }
        
                usersToAdd = newReceivers.filter(newReceiver => 
                    !currentReceivers.some(currentReceiver => currentReceiver.userId === newReceiver.userId)
                    );
            }
            return await ResourcesSharingDAO.editResource(resourceId, resource, isReceiverGroupsSame,previousReceiverGroups, usersToAdd);
        } catch (error) {
            console.error('Error updating resource sharing:', error);
    
            return {
                error: true,
                message: 'An error occurred while updating the resource sharing. Please try again later.'
            };
        }
    },

    async deleteResource(resourceId) {
        try {
            return await ResourcesSharingDAO.deleteResource(resourceId);
        } catch (error) {
            console.error('Service Error:', error);
            throw new Error('Failed to delete resource. Please try again later.');
            // return {
            //     error: true,
            //     message: 'An error occurred while deleting the resource. Please try again later.'
            // };
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
        
                    if (item.receiverId && item.receiverName) {
                        result.receivers.push({
                            receiverId: item.receiverId,
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
    }
}



module.exports = ResourceSharingService;
