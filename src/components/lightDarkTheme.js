import { dark, white } from "../assets/constants/Colors"

export function changeColor(theme){
    return (theme) ? {color : dark} : {color : white}
}
export function changeBackgroundColor(theme){
    return (theme) ? {backgroundColor : white} : {backgroundColor : dark}
}
