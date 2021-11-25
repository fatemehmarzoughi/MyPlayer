import { StyleSheet } from "react-native";
import { statusBarIOS, width } from "assets/constants/Units";
import {dark, gray, lightGray, mainColor, white} from 'assets/constants/Colors'

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
    email: {
        width : 170,
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
        borderRadius : 10,
        backgroundColor : lightGray
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
})