const sendNotifications = require ('./send_notification');
const notificationWorker = function() {
  return {
    run: function() {
      console.log('in function notification worker')
      sendNotifications();
    },
  };
};

module.exports = notificationWorker();