import Realm from 'realm';

realm = new Realm({
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
        }
    ]
})

let realm = new Realm({
    path : 'Database.realm',
})

export default realm;