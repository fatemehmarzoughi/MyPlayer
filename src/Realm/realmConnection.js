import Realm from 'realm';

realm = Realm.open({
    path : "Database.realm",
    schema : [
        {
            name : 'MyVariables',
            properties : {
                isFirstInstallation : 'string',
                accessToken : 'string',
                emailNotification : {
                    default : 'true',
                    type : 'string'
                },
                appNotification : {
                    default : 'true',
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