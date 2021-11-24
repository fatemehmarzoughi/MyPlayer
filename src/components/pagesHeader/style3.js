import { StyleSheet } from "react-native";
import {statusBarIOS, width} from '../../assets/constants/Units'

export const styles = StyleSheet.create({
    container : {
        width : width,
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : statusBarIOS,
        padding : 15
    },
    title : {
        fontSize : 18,
    },
    icon : {
        paddingRight : 10,
        paddingLeft : 10,
    }
})