import { StyleSheet } from "react-native";
import { lightGray, mainColor, white } from "../../../assets/constants/Colors";
import { statusBarIOS, width } from "../../../assets/constants/Units";

const usedWidth = width - 20;
export const styles = StyleSheet.create({
    container : {
        marginTop : statusBarIOS,
        width : usedWidth,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        marginRight : 'auto',
        marginLeft : 'auto',
    },
    image : {
        width : 130,
        height : 130,
        borderRadius : 10,
        marginTop : 40,
    },
    changePhoto : {
        margin : 15,
        fontWeight : 'bold',
        textDecorationLine: 'underline'
    },
    input : {
        backgroundColor : lightGray,
        padding : 20,
        width : usedWidth - 20,
        borderRadius : 10,
        marginTop : 10,
    },
    inputs : {
        marginTop : 20,
    },
    deleteBtn : {
        padding : 20,
        backgroundColor : lightGray,
        margin : 80,
        width : usedWidth - 20,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10,
    },
    deleteBtnText : {
        color : mainColor,
        fontWeight : 'bold',
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