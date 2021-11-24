import React from "react";
import MainHeader from '../../components/pagesHeader/MainHeader'
import { View, Text } from "react-native";
import { changeBackgroundColor } from "../../components/lightDarkTheme";
import context from "../../context/context";

export default class TermsAndPolicy extends React.Component{

    static contextType = context

    constructor(){
        super();

    }

    render(){
        return(
            <View style={changeBackgroundColor(this.context.theme)}>
                <MainHeader 
                  menuOnPress = {() => this.props.navigation.openDrawer()}
                  searchOnPress = {() => this.props.navigation.navigate('Search')}
                />
                <Text>Terms and policy</Text>
            </View>
        )
    }
}