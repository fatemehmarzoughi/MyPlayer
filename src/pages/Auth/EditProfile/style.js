import { StyleSheet } from "react-native";
import { lightGray, mainColor, white } from "assets/constants/Colors";
import { statusBarIOS, width } from "assets/constants/Units";

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
        backgroundColor : lightGray
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
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row'
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
})