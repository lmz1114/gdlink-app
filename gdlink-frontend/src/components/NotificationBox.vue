<template>
    <div class="notification-box">
        <div class="status-box">
            <i class="bi bi-circle-fill"></i> 
        </div>
        <div class="flex-grow-1">
            <p class="notification-text">
                <strong>{{ notification.name }}</strong> 
                {{ notification.action }} 
                <strong>{{ notification.resource }}</strong>
            </p>
            <p class="notification-date-time">
                {{ notification.date }} | {{ notification.time }}
            </p>
        </div>
        <div class="float-end">
            <button class="btn btn-primary me-4">View</button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notification: {
          name: "John Doe", // Replace with dynamic data
          action: "has uploaded",
          resource: "Project Plan",
          date: "14 Dec 2024",
          time: "10:30 AM",
        },
      };
    },
  };
  </script>
  
  <style>
  .notification-box{
    align-items: center;
    padding: 5px;
    border: 1px solid #666;
    border-radius: 8px;
    display:flex;
    background-color: rgb(211, 211, 211);
  }

  .status-box{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin-right: 5px;
  }

  .bi-circle-fill{
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

  .btn{
    border-radius: 10px;
    width: 100px;
  }
  </style>
  