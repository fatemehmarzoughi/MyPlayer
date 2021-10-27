import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header2 from "../../../components/pagesHeader/Header2";
import {styles} from './style';

export default class ResetPassword extends React.Component{

    constructor(){
        super();
        this.state = {

        }
    }

    onCancel = () => {
        this.props.navigation.navigate('Profile')
    }

    onSave = () => {
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Header2 
                      title="Reset Password"
                      onCancel={() => this.onCancel()}
                      onSave={() => this.onSave()}
                    />
                    <TextInput 
                      placeholder="New Password"
                      style={styles.input}
                      secureTextEntry={true}
                    />
                    <TextInput 
                      placeholder="Old Password"
                      style={styles.input}
                      secureTextEntry={true}
                    />
                </View>
            </ScrollView>
        )
    }
}