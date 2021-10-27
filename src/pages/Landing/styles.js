import { StyleSheet } from "react-native";
import { width } from '../../assets/constants/Units'
import {dark, mainColor, white} from '../../assets/constants/Colors'

export const styles = StyleSheet.create({
    container : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-around',
        marginTop : 'auto',
        flex : 1,
        backgroundColor : dark,
        position : 'relative'
    },
    topBox : {
        backgroundColor : dark,
        width : width,
        padding : 70,
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    loadingIcon : {
        width : 200,
        height : 200,
        // marginBottom : 50,
    },
    mainText : {
        color : mainColor,
        fontWeight : 'bold',
        fontSize : 20,
    },
    subtitleText : {
        color : mainColor,
    }
})