import React from "react";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "./style3";
import { changeColor } from "../lightDarkTheme";
import context from "context/context";

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
                <Text style={[styles.title, changeColor(this.context.theme)]}>MyPlayer</Text>
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