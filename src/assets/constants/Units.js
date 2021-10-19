import { Dimensions, StatusBar } from "react-native"

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const statusBar = StatusBar.currentHeight;
