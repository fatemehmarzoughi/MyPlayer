import { StyleSheet } from "react-native"
import { width, statusBarIOS } from "assets/constants/Units"
import * as Colors from "assets/constants/Colors"

export const styles = StyleSheet.create({
    topTabBar : {
        elevation:0,
        paddingTop : statusBarIOS,
        // backgroundColor : Colors.white
    },
    mainTitle : {
        fontWeight : 'bold',
        fontSize : 16,
        color : Colors.dark
    },
    container : {
        // display : 'flex',
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        // backgroundColor : 'red',
        marginTop : 50,
        marginBottom : 150,
    }, 

    input : {
        width : width - 30,
        padding : 15,

    },
    textInput : {
        borderBottomColor : 'red',
        borderBottomWidth : .5,
        padding : 20,
        color : Colors.gray,

    },
    text : {
        color : Colors.gray
    },
    btn : {
        padding : 20,
        backgroundColor : Colors.mainColor,
        borderRadius : 10,
        width : width - 50,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
        margin : 15,
    },
    btnText : {
        color : Colors.white,
    },
    googleBtn : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
        margin  : 10,
        padding : 15,
        borderColor : Colors.mainColor,
        borderStyle : 'solid',
        borderWidth : 1,
        width : width - 50,
        borderRadius : 10,
    },
    googleLogo : {
        marginRight : 10,
    },
    seperator : {
        // position : 'relative'
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row',
        width : (width - 50),
        margin : 20,
    },
    line : {
        borderTopColor : Colors.gray,
        borderTopWidth : .5,
        borderStyle : 'solid',
        width : (width - 100)/2,
        height : 1,
    },
    eyeIconsStyle : {
        position : 'absolute',
        right :50,
        top : 0,
        padding : 20,
    },
    eyeIconStyle : {
        position : 'absolute',
        padding : 40,
    },
    planContainer : {
        margin : 10,
        marginLeft : 0,
        // width : 160,
        // height : 250,
        width : width / 3,
        height : width / 2,
        borderRadius : 10,
        display : 'flex',
        alignItems : 'center',
        justifyContent : "space-evenly",
        borderStyle : 'solid',
        borderWidth : 1,
        borderColor : Colors.gray
    },
    planSection : {
        alignSelf : 'center',
        width : width - 50,
        marginLeft : 15,
        color : Colors.gray
    },
    planTitle : {
        // fontWeight : 'bold',
        fontSize : 16,
        marginBottom : 10,
    },
    planSubTitle : {
        color : Colors.gray,
        // marginLeft : 5,
        marginRight : 5,
    },
    plansFlatlist : {
        marginTop : 15,
        alignSelf : 'center'
    },
    planIcon : {
        color : Colors.gray
    },
    planText : {
        fontWeight : 'normal'
    },
    planTextContainer : {
        display : 'flex',
        alignItems : "center",
        justifyContent : 'center'
    },
    description : {
        color : Colors.gray
    },
    errorMessage : {
        color : 'red',
        marginTop : 7,
        display : 'none'
    },
    loadingIcon:{
        opacity : 0,
    },
    picker : {
        display : 'flex',
        alignItems : 'flex-end',
        justifyContent : 'space-between',
        flexDirection : 'row-reverse',
        borderBottomColor : 'red',
        borderBottomWidth : .5,
        padding : 20,
        color : Colors.gray,
    },
    resetPassword : {
        width : width - 50,
        margin : 10,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'flex-end',
        flexDirection : 'row'
    },
    resetText : {
        textDecorationLine : 'underline',
        color : Colors.dark
    },
    forgetPassText : {
        color : Colors.dark
    }

})