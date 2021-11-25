import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { white } from "assets/constants/Colors";
import { styles } from "./style";

export default class Header extends React.Component{
    render(){
        return(
            <View style={styles.header}>
                <TouchableOpacity onPress={this.props.customClick} style={styles.iconBack}>
                   <Icon name="chevron-left" size={40} color={white} />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text></Text>
                <Text></Text>
            </View>  
        )
    }
}