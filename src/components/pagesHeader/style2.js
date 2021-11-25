import { StyleSheet } from "react-native";
import { titleFontSize, width} from 'assets/constants/Units'
import * as Colors from 'assets/constants/Colors'

const usedWidth = width - 20
export const styles = StyleSheet.create({
    header : {
        width : usedWidth,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    },
    row1 : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between',
        width : usedWidth,
        flexDirection : 'row-reverse'
    },
    saveText : {
        color : Colors.mainColor,
        fontWeight : 'bold',
        fontSize : 18,
    },
    cancelText : {
        fontSize : 18
    },
    btn : {
        padding : 20,
    },
    title : {
        fontSize : titleFontSize,
    }
})