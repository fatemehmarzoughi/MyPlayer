import { StyleSheet } from "react-native";
import { lightGray } from "../../../assets/constants/Colors";
import { statusBarIOS, width } from "../../../assets/constants/Units";

const usedWidth = width - 20;
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
    row : {
        width : usedWidth,
        marginTop : 20,
    },
    flatlist : {
        marginTop : 20,
    },
    Image : {
        width : 150,
        height : 200,
        borderRadius : 10,
        margin : 10,
        backgroundColor : lightGray
    },
    title : {
        fontSize : 16,
        width : usedWidth,
        paddingLeft : 10,
    }
})