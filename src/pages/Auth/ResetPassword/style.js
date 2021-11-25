import { StyleSheet } from "react-native";
import {statusBarIOS, width} from 'assets/constants/Units'
import { lightGray } from 'assets/constants/Colors'

const usedWidth = width - 20
export const styles = StyleSheet.create({
    container : {
        marginTop : statusBarIOS,
        width : usedWidth,
        marginRight : 'auto',
        marginLeft : 'auto'
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
    }
})