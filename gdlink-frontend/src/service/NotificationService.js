import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/notification';

const NotificationService = {
  async getUserNotifications(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}`);
      return response.data.notifications;  
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  async markAsSeen(notificationId, userId) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${userId}/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error marking notification as seen:', error);
      throw error;
    }
  },

  async deleteNotification(notificationId, userId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${userId}/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }
};

export default NotificationService;
