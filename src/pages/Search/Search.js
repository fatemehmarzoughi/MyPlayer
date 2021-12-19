import React from "react";
import MainHeader from 'components/pagesHeader/MainHeader'
import { View, Text, TextInput } from "react-native";
import context from "context/context";
import { changeBackgroundColor, changeBackgroundColor2 } from "components/lightDarkTheme";
import * as Colors from '/assets/constants/Colors';
import {styles} from './style'

export default class Search extends React.Component{

    static contextType = context

    constructor(){
        super();

    }

    render(){
        return(
            <View style={[changeBackgroundColor(this.context.theme) , {flex : 1}]}>
                <TextInput
                 placeholder="Search"
                 style={[changeBackgroundColor2(this.context.theme) ,styles.input]}
                 placeholderTextColor = {this.context.theme ? Colors.dark : Colors.white}
                 />
            </View>
        )
    }
}