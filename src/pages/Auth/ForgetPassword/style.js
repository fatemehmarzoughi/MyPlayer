import { StyleSheet } from "react-native";
import { statusBarIOS } from "../../../assets/constants/Units";
import { width } from "../../../assets/constants/Units";
import { lightGray, mainColor, white } from "../../../assets/constants/Colors";

const usedWidth = width - 30;
export const styles = StyleSheet.create({
    container : {
        width : usedWidth,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        marginRight : 'auto',
        marginLeft : 'auto',
        marginTop : statusBarIOS,
    },
    input : {
        width : usedWidth,
        paddingLeft : 20,
        paddingTop : 20,
        paddingBottom : 20,
        backgroundColor : lightGray,
        // marginBottom : 5,
        marginTop : 20,
        borderRadius : 10,
    },
    btn : {
        width : usedWidth ,
        backgroundColor : mainColor,
        alignItems : 'center',
        padding : 17,
        borderRadius : 10,
        marginTop : 20,
    },
    btnText : {
        color : white
    }
})