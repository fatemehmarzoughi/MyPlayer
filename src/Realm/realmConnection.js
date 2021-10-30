import Realm from 'realm';

realm = Realm.open({
    path : "Database.realm",
    schema : [
        {
            name : 'userInstallation',
            properties : {
                isFirstInstallation : 'string'
            }
        },
        {
            name : 'Authentication',
            properties : {
                accessToken : 'string'
            }
        },
        {
            name : 'Notification',
            properties : {
                emailNotification : {
                    default : true,
                    type : 'string'
                },
                appNotification : {
                    default : true,
                    type : 'string'
                }
            }
        }
    ]
})

realm = new Realm({
    path : 'Database.realm',
})
// realm = new Realm({
//     schema : ['userInstallation' , 'Authentication' , 'Notification'],
// })

export default realm;