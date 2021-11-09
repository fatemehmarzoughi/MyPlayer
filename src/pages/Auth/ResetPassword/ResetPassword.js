import React from "react";
import { ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Header2 from "../../../components/pagesHeader/Header2";
import {styles} from './style';
import { POST } from '../../../API/index'
import Toast from 'react-native-toast-message';
import { toastMessageDuration } from "../../../assets/constants/Units";


export default class ResetPassword extends React.Component{

    constructor(){
        super();
        this.state = {
            oldPass : '',
            newPass : '',
        }
    }

    onCancel = () => {
        this.props.navigation.navigate('Profile')
    }

    onSave = async () => {

        const reqBody = {
            oldPass : this.state.oldPass,
            newPass : this.state.newPass
        }

        try{
            const result = await POST('/editProfile/resetPass' , reqBody);
            const message = await result.text();
            if(result.status === 200)
            {
                Toast.show({
                    type : 'success',
                    position : 'top',
                    autoHide : true,
                    text1 : message,
                    text2 : 'Your new Password is available for login',
                    visibilityTime : toastMessageDuration,
                    topOffset : 30,
                    bottomOffset : 40
                })
            }
            else
                Toast.show({
                    type : 'error',
                    position : 'bottom',
                    autoHide : true,
                    text1 : message,
                    text2 : 'Please try again',
                    visibilityTime : toastMessageDuration,
                    topOffset : 30,
                    bottomOffset : 40
                })
        }
        catch(err){
            console.log(err)
            Toast.show({
                type : 'error',
                position : 'bottom',
                autoHide : true,
                text1 : 'Something went wrong',
                text2 : 'Please try again',
                visibilityTime : toastMessageDuration,
                topOffset : 30,
                bottomOffset : 40
            })
        }

    }

    handleOldPass = (oldPass) => {
        this.setState({
            oldPass,
        })
    }

    handleNewPass = (newPass) => {
        this.setState({
            newPass,
        })
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
                      placeholder="Old Password"
                      style={styles.input}
                      secureTextEntry={true}
                      onChangeText={(input) => this.handleOldPass(input) }
                    />
                    <TextInput 
                      placeholder="New Password"
                      style={styles.input}
                      secureTextEntry={true}
                      onChangeText={(input) => this.handleNewPass(input) }
                    />
                </View>
            </ScrollView>
        )
    }
}