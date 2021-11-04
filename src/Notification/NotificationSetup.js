import PushNotification from "react-native-push-notification";

const channelIds = {
    notificationOnMessage : 'notificationOnMessage',
    testId : 'testId'
}

class Notification {

    constructor(){
        PushNotification.configure({
            onRegister : function (token) {
                console.log(`onRegister notification, token = ${token}`);
            },
            onNotification : function (notification) {
                switch(notification.channelId)
                {
                    case channelIds.notificationOnMessage : 
                      console.log('pressed notification (channelId = notificationOnMessage)')
                      break;
                      
                    case channelIds.testId : 
                      console.log('pressed notification (channelId = testId)')
                    break;
                }
            },
            requestPermissions : false,
            popInitialNotification : true,
        })

        PushNotification.createChannel({
            channelId : channelIds.notificationOnMessage,
            channelName : 'notificationOnMessage',
            channelDescription : 'Get this when the user turn on the notification in Profile page'
        }, () => {})

        PushNotification.createChannel({
            channelId : channelIds.testId,
            channelName : 'test name',
            channelDescription : 'test description',
        } , () => {})

        PushNotification.getScheduledLocalNotifications((rn) => {
            console.log(`SN --- ${rn}`)
        })
    }


    notifyOnMessage(date){
        PushNotification.localNotificationSchedule({
            channelId : channelIds.notificationOnMessage,
            title : 'Your Notification turn on',
            message : 'Get news on time.',
            date,
        })
    }

    scheduleNotification(date){
        PushNotification.localNotificationSchedule({
            channelId : channelIds.testId,
            title : 'test title',
            message : 'test message',
            date,
        })
    }
}

export default new Notification();