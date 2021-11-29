import React from "react";
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {changeColor} from 'components/lightDarkTheme'
import { titleFontSize, width} from 'assets/constants/Units'
import * as Colors from 'assets/constants/Colors'

export default class Header2 extends React.Component{

    constructor(){
        super();
        this.state = {

        }
    }

    render()
    {
        return(
            <View style={styles.header}>
                <View style={styles.row1}>
                   <TouchableOpacity onPress={this.props.onSave} style={styles.btn}>
                       <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                   <TouchableOpacity onPress={this.props.onCancel} style={styles.btn}>
                       <Text style={[styles.cancelText, changeColor(this.props.theme)]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}



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