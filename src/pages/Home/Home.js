import React from "react";
import { Text, View } from 'react-native';
import MainHeader from "../../components/pagesHeader/MainHeader";
import Notification from "../../Notification/NotificationSetup";
import { changeBackgroundColor } from "../../components/lightDarkTheme";
import context from "../../context/context";

export default class Home extends React.Component{

    static contextType = context

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
            <View style={changeBackgroundColor(this.context.theme)}>
                <MainHeader 
                  searchOnPress={() => this.props.navigation.navigate('Search') } 
                  menuOnPress={() => this.props.navigation.openDrawer()} 
                />
                <Text>Home</Text>
                {/* <Text onPress={() => this.notify()}>Text notification</Text>
                <Text onPress={() => this.props.navigation.openDrawer()}>Text notification</Text> */}
            </View>
        )
    }
}