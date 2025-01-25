<template>
  <div
    class="notification-box"
    :style="{
      backgroundColor:
        notification.readStatus === 1
          ? 'white'
          : 'rgb(211, 211, 211)' /* Light blue for read, grey for unread */,
      borderColor: notification.readStatus === 1 ? '#FAB74C' : '#666',
    }"
  >
    <div class="status-box">
      <i v-if="notification.readStatus === 0" class="bi bi-circle-fill"></i>
    </div>
    <div class="flex-grow-1">
      <p class="notification-text">
        {{ notification.message }}
      </p>
      <p class="notification-date-time">
        {{ formatDate(notification.createdAt) }}
      </p>
    </div>
    <div class="float-end">
      <button v-if="!notification.readStatus" @click="markAsRead" class="btn btn-primary me-4" style="font-size: 13px; width:120px">Mark As Read</button>
      <button @click="deleteNotification" class="btn btn-danger me-4">
        Delete
      </button>
    </div>
  </div>
</template>
  
<script>
import dayjs from "dayjs";

export default {
  props: {
    notification: {
      type: Object,
      required: true,
      default: () => ({ message: "", createdAt: "" }),
    },
  },
  methods: {
    formatDate(date) {
      console.log("Date received:", date);
      if (!date) return "No Date Available"; 
      const formattedDate = dayjs(date).format("DD MMM YYYY || hh:mm A");
      return formattedDate;
    },

    markAsRead() {
      this.$emit("markAsRead", this.notification.notificationId);
    },
    deleteNotification() {
      this.$emit("deleteNotification", this.notification.notificationId);
    },
  },
};
</script>
  
  <style>
.notification-box {
  align-items: center;
  padding: 5px;
  border: 1px solid;
  border-radius: 8px;
  box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.status-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 5px;
}

.bi-circle-fill {
  color: red;
}
.notification-text {
  margin: 0;
  font-size: 14px;
}

.notification-date-time {
  margin: 5px 0 0 0;
  font-size: 12px;
  color: #666;
}

.btn {
  border-radius: 10px;
  width: 90px;
}
</style>
  
  
