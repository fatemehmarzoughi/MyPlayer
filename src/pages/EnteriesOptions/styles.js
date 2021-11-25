import { StyleSheet } from "react-native";
import { height, width } from 'assets/constants/Units'
import * as Colors from "assets/constants/Colors";

export const styles = StyleSheet.create({
    container : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 'auto',
        flex : 1,
        backgroundColor : Colors.dark,
        position : 'relative'
    },
    btnContainer : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        // flex : 1,
        marginTop : 'auto',
        backgroundColor : Colors.dark,
    },
    mainBtn : {
        paddingRight : width/4,
        paddingLeft : width/4,
        paddingTop : 20,
        paddingBottom : 20,
        backgroundColor : Colors.mainColor,
        borderRadius : 5,
        margin : 15,
    },
    BtnText : {
        fontWeight : 'bold',
        color : Colors.white
    },
    minorBtn : {
        paddingRight : width/4,
        paddingLeft : width/4,
        paddingTop : 20,
        paddingBottom : 20,
        borderColor : Colors.mainColor,
        borderStyle : 'solid',
        borderWidth : 1,
        borderRadius : 5,
        marginBottom : 20,
    },
    imageStyle : {
        width : width ,
        height : height/2,
        position : 'absolute',
        top : 20,
        right : 0,
        left : 0,
        zIndex : 22,
    }

})