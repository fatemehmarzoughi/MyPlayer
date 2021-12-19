// @flow
import * as Colors from "assets/constants/Colors"

export function changeColor(theme){
    return (theme) ? {color : Colors.dark} : {color : Colors.white}
}
export function changeBackgroundColor(theme){
    return (theme) ? {backgroundColor : Colors.white} : {backgroundColor : Colors.black}
}
export function changeBackgroundColor2(theme){
    return (theme) ? {backgroundColor : Colors.lightGray} : {backgroundColor : Colors.dark}
}