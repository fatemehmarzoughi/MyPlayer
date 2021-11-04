import React from "react";
import { Text, View } from 'react-native';
import Notification from "../../Notification/NotificationSetup";

export default class Home extends React.Component{

    constructor(){
        super();
        this.state={

        }
    }

    notify = () => {
        Notification.scheduleNotification(new Date(Date.now() + (5*1000)));
    }
 
    render(){
        return(
            <View>
                <Text onPress={() => this.notify()}>Text notification</Text>
            </View>
        )
    }
}