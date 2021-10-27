import React from "react";
import {styles} from './style2'
import {Text, View, TouchableOpacity} from 'react-native'

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
                       <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}