import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { changeColor } from "../lightDarkTheme";
import context from "context/context";
import {statusBarIOS, width} from 'assets/constants/Units'

export default class MainHeader extends React.Component{

    static contextType = context

    constructor(){
        super();
    }

    render(){
        return(
            <View style={[styles.container ]}>
                <Icon 
                  onPress={this.props.menuOnPress} 
                  size={22} 
                  style={[styles.icon , changeColor(this.context.theme)]} 
                  name="menu" 
                />
                <Text style={[styles.title, changeColor(this.context.theme)]}>
                   {this.props.isLive ? "Live" : "MyPlayer"}
                </Text>
                <Icon 
                  onPress={this.props.searchOnPress} 
                  size={22} 
                  style={[styles.icon , changeColor(this.context.theme)]} 
                  name="search" 
                />
            </View>
        )
    }
}


export const styles = StyleSheet.create({
    container : {
        width : width,
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : statusBarIOS,
        padding : 15
    },
    title : {
        fontSize : 18,
    },
    icon : {
        paddingRight : 10,
        paddingLeft : 10,
    }
})