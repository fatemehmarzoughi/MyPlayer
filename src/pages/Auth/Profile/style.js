import React from "react";
import { StyleSheet } from "react-native";
import { getCountryInfoAsync } from "react-native-country-picker-modal/lib/CountryService";
import { statusBarIOS, width } from "../../../assets/constants/Units";
import {dark, gray, mainColor, white} from '../../../assets/constants/Colors'

const usedWidth = width - 30;
export const styles = StyleSheet.create({
    container : {
        marginRight : 'auto',
        marginLeft : 'auto',
        marginTop : statusBarIOS,
        width : usedWidth,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
    },
    header : {
        display : 'flex',
        alignItems : 'flex-start',
        justifyContent : 'center',
        width : usedWidth
    },
    title : {
        fontWeight : 'bold',
        fontSize : 20,
        marginBottom : 10,
    },
    row1 : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'flex-start',
        flexDirection : 'row',
        width : usedWidth,
        marginTop : 30,
        marginBottom : 30,
    },
    nameEmail:{
        marginLeft : 40,
    },
    nameText : {
        fontWeight : 'bold',
        fontSize :  18,
        marginLeft : 5,
    },
    name : {
        marginBottom : 7,
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center'
    },
    profileImg : {
        width : 120,
        height : 120,
        borderRadius : 10
    },
    row2 : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row',
        width : usedWidth
    },
    My : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
    },
    MyText : {
        fontWeight : 'bold',
        marginTop : 7,
        fontSize : 12,
    },
    editProfile : {
        backgroundColor : mainColor,
        padding : 10,
        borderRadius : 25,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row'
    },
    editProfileText : {
        color : white,
        fontSize : 12,
    },

    seperators : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row',
        marginTop : 40,
        width : width,
    },
    seperator : {
        width : width/2.5,
        height : 0.2,
        backgroundColor : gray,

    },

    part : {
        width : usedWidth,
        marginTop : 40,
        marginBottom : 40,
    },
    subTitle : {
        marginBottom : 20,
        fontSize : 18,
        color : dark,
    },
    option : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row',
        borderBottomColor : dark,
        borderBottomWidth : 1,
        borderStyle : 'solid',
        padding : 15,
    },
    premium : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row',
    },
    premiumOption : {
        padding : 15,
        borderBottomColor : dark,
        borderBottomWidth : 1,
        borderStyle : 'solid',

    },
    premiumOptionText : {
        fontSize : 10,
        color : gray
    },
    optionTitleIcon :{ 
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
    },
    optionTitle : {
        marginLeft : 7,
        color : dark
    },
    premiumOptionTitle : {
        marginLeft : 7,
        color : gray
    },
    loadingIcon : {
        width : 100,
        height : 100,
    },
    modalStyle : {
       backgroundColor : mainColor,
       display : 'flex',
       alignItems : 'center',
       justifyContent :'center',
       marginTop : 'auto',
       marginBottom : 'auto',
       marginRight : 'auto',
       marginLeft : 'auto',
       width : usedWidth,
       padding : 30,
       borderRadius : 10,
    },
    btns : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-around',
        width : usedWidth,
        flexDirection : 'row-reverse',
        marginTop : 30,
    },
    btnStyle : {
        padding : 20,
        paddingRight : 30,
        paddingLeft : 30,
        borderStyle : 'solid',
        borderColor : white,
        borderRadius : 10,
        borderWidth : 1,
    },
    textColor : {
        color : white,
        fontWeight : 'bold'
    }
})