import { StyleSheet } from "react-native";
import { width } from "../../assets/constants/Units";
import { mainColor } from "../../assets/constants/Colors";

const usedWidth = width - 20;

export const styles = StyleSheet.create({
    header : {
        marginBottom : 30,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        width : usedWidth,
        flexDirection : 'row',
        // margin : 10,
    }, 
    iconBack : {
        backgroundColor : mainColor,
        borderRadius : 15,
        width : 40,
        height : 40,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },
    title : {
        fontWeight : 'bold'
    },
})