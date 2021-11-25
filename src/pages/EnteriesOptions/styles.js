import { StyleSheet } from "react-native";
import { height, width } from 'assets/constants/Units'
import { dark, mainColor, white } from "assets/constants/Colors";

export const styles = StyleSheet.create({
    container : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 'auto',
        flex : 1,
        backgroundColor : dark,
        position : 'relative'
    },
    btnContainer : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        // flex : 1,
        marginTop : 'auto',
        backgroundColor : dark,
    },
    mainBtn : {
        paddingRight : width/4,
        paddingLeft : width/4,
        paddingTop : 20,
        paddingBottom : 20,
        backgroundColor : mainColor,
        borderRadius : 5,
        margin : 15,
    },
    BtnText : {
        fontWeight : 'bold',
        color : white
    },
    minorBtn : {
        paddingRight : width/4,
        paddingLeft : width/4,
        paddingTop : 20,
        paddingBottom : 20,
        borderColor : mainColor,
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