const ResourcesSharingService = require('../service/ResourcesSharingService');
const NotificationService = require('../service/NotificationService');
const UserLogService = require('../service/UserLogService');

const ResourcesSharingController = {
    async getMyShareLinksChartData(req,res){
        try{
            const sharerId = req.params.userId;

            const resourceList = await ResourcesSharingService.getChartData(sharerId,'sharer_id');
            return res.json(resourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getMySharedWithMeChartData(req,res){
        try{
            const receiverId = req.params.userId;

            const resourceList = await ResourcesSharingService.getChartData(receiverId,'receiver_id');
            return res.json(resourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },

    async shareResource(req, res) { 
        try {
            const sharerId = req.params.userId;
            const { resource } = req.body;
            console.log(resource);
            const { refName } = resource;

            const username = await ResourcesSharingService.getUserNameById(sharerId);

            const result = await ResourcesSharingService.shareResource(sharerId, resource);
            const resourceId = result.resourceId;

            const message = `${username} shared the resource "${refName}" .`;

            await UserLogService.createUserLog(sharerId, message);

            const notificationResult = await NotificationService.createNotification(resourceId, message);
            const notificationId = Number(notificationResult.insertId);

            const receivers = await NotificationService.getReceiversToNotify(resourceId);

            for (const receiver of receivers) {
                await NotificationService.createUserNotifications(receiver.receiverEmail, notificationId);
            }
            console.log(message);
            res.status(201).json({
                message: 'Resource shared successfully',
                ...result,
            });
        } catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({
                message: 'An error occurred while sharing the resource',
                error: error.message,
            });
        }
    },

    async editResource(req, res) { //updated
        try {
            const sharerId = req.params.userId;
            const resourceId = req.params.resourceId;
            const { resource, previousShareTo, previousReceiverGroups, previousReceivers } = req.body;
            console.log(resource);
            const { refName } = resource;
            const result = await ResourcesSharingService.editResource(sharerId, resourceId, previousShareTo, previousReceiverGroups, previousReceivers, resource);
            

            const username = await ResourcesSharingService.getUserNameById(sharerId); //GET name for actor
            const ownerId = await NotificationService.getSharerToNotify(resourceId);//get userid for resource sharer

            const message = `${username} edited the resource "${refName}" .`;
            const messageForOwner = `Your resource "${refName}" has been edited by ${username}.`; //speccial message for resource sharer

            await UserLogService.createUserLog(sharerId, message);

            const notificationResult = await NotificationService.createNotification(resourceId, message);
            const notificationId = Number(notificationResult.insertId);

            // Fetch the receivers to notify
            const receivers = await NotificationService.getReceiversToNotify(resourceId);

            // Create user notifications for each receiver
            for (const receiver of receivers) {
                await NotificationService.createUserNotifications(receiver.receiverEmail, notificationId);
            }

            // Notify the resource owner about the edit
        if (ownerId && ownerId !== sharerId) {
            const ownerNotificationResult = await NotificationService.createNotification(resourceId, messageForOwner);
            const ownerNotificationId = Number(ownerNotificationResult.insertId);

            await NotificationService.createUserNotifications(ownerId, ownerNotificationId);
        }
            console.log(message);
            res.status(201).json({
                message: 'Resource shared successfully',
                ...result,
            });
        } catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({
                message: 'An error occurred while sharing the resource',
                error: error.message,
            });
        }
    },

    async deleteResource(req, res) {//updated
        try {
            
            const resourceId = req.params.resourceId;
            const refName = await ResourcesSharingService.getRefNameById(resourceId);
            const userId = req.params.userId;

            const username = await ResourcesSharingService.getUserNameById(userId);
            const ownerId = await NotificationService.getSharerToNotify(resourceId);//get userid for resource sharer
            // Define the notification message using refName
            const message = `${username} deleted the resource "${refName}" .`;
            const messageForOwner = `Your resource "${refName}" has been deleted by ${username}.`;

            await UserLogService.createUserLog(userId, message);

            const notificationResult = await NotificationService.createNotification(resourceId, message);
            const notificationId = Number(notificationResult.insertId);

            const receivers = await NotificationService.getReceiversToNotify(resourceId);
            
            for (const receiver of receivers) {
                await NotificationService.createUserNotifications(receiver.receiverId, notificationId);
            }

            if (ownerId && ownerId !== userId) {
                const ownerNotificationResult = await NotificationService.createNotification(resourceId, messageForOwner);
                const ownerNotificationId = Number(ownerNotificationResult.insertId);
    
                await NotificationService.createUserNotifications(ownerId, ownerNotificationId);
            }

            console.log(message);

            const result = await ResourcesSharingService.deleteResource(resourceId);
            return res.json(result);
        } catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({
                message: 'An error occurred while deleting the resource',
                error: error.message,
            });
        }
    },

    async getMyShareLinksResources(req, res) {
        try {
            const sharerId = req.params.userId;
            const resourceList = await ResourcesSharingService.getMyShareLinksResources(sharerId);
            return res.json(resourceList);
        } catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({
                message: 'An error occurred while retrieving the resource',
                error: error.message,
            });
        }
    },

    async getSharedWithMeResources(req,res){
        try{
            const receiverId = req.params.userId;
            const resourceList = await ResourcesSharingService.getSharedWithMeResources(receiverId);
            return res.json(resourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getFilteredMyShareLinksResources(req,res){
        try{
            const sharerId = req.params.userId;
            const {categories, semesters} = req.body;
            const filteredResourceList = await ResourcesSharingService.getFilteredResources(sharerId,"sharer_id",categories,semesters);
            return res.json(filteredResourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getFilteredSharedWithMeResources(req,res){
        try{
            const receiverId = req.params.userId;
            const {categories, semesters} = req.body;
            const filteredResourceList = await ResourcesSharingService.getFilteredResources(receiverId,"receiver_id",categories,semesters);
            return res.json(filteredResourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getSearchedMyShareLinksResources(req,res){
        try{
            const sharerId = req.params.userId;
            const {key} = req.body;
            const searchedResourceList = await ResourcesSharingService.getSearchedResources(sharerId,"sharer_id",key);
            return res.json(searchedResourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getSearchedSharedWithMeResources(req,res){
        try{
            const receiverId = req.params.userId;
            const {key} = req.body;
            const searchedResourceList = await ResourcesSharingService.getSearchedResources(receiverId,"receiver_id",key);
            return res.json(searchedResourceList);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getMyShareLinksResourceDetails(req,res){
        try{
            const resourceId = req.params.resourceId;
            const resource = await ResourcesSharingService.getResourceDetails(resourceId);
            return res.json(resource);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },
    async getSharedWithMeResourceDetails(req,res){
        try{
            const resourceId = req.params.resourceId;
            const receiverId = req.params.userId;

            const resource = await ResourcesSharingService.getResourceDetails(resourceId,receiverId);
            return res.json(resource);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    },

    async getAllResources(req,res){
        try{
            const resource = await ResourcesSharingService.getAllResources();
            return res.json(resource);
        } catch (error) {
            console.error('Controller Error:', error.message); 
            res.status(500).json({
              message: 'An error occurred while retrieving the resource',
              error: error.message, 
            });
        }
    }
}

module.exports = ResourcesSharingController;
