import React from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Header from "../../../components/pagesHeader/Header";
import { styles } from "./style";
import Toast from 'react-native-toast-message';
import { toastMessageDuration } from "../../../assets/constants/Units";
import {POST} from '../../../API/index'
import LottieView from 'lottie-react-native';



export default class ForgetPassword extends React.Component{

    constructor(){
        super();
        this.state = { 
            email : '',
            sending : false,
        }
    }

    handleSend = async () => {
        this.setState({
            sending : true
        })
        if(this.state.email == "")
        {
            Toast.show({
                type : 'error',
                position : 'bottom',
                text1 : 'Please enter your email',
                topOffset : 30,
                bottomOffset : 40,
                autoHide : true,
                visibilityTime : toastMessageDuration
            })
            this.setState({
                sending : false
            })
            return
        }

        const reqBody = {
            email : this.state.email
        }
        try{
            const res = await POST('/forgotPassword' , reqBody);
            const message = await res.text();
            if(res.status === 200){
                Toast.show({
                    type : 'success',
                    position : 'top',
                    text1 : 'Email sent',
                    text2 : 'Please check your inbox',
                    topOffset : 30,
                    bottomOffset : 40,
                    autoHide : true,
                    visibilityTime : toastMessageDuration
                })
                this.setState({
                    sending : false
                })
                this.props.navigation.navigate('Login_CreateAccount');
                return
            }
            else{
                Toast.show({
                    type : 'error',
                    position : 'bottom',
                    text1 : message,
                    text2 : 'Please try again' ,
                    topOffset : 30,
                    bottomOffset : 40,
                    autoHide : true,
                    visibilityTime : toastMessageDuration
                })
                this.setState({
                    sending : false
                })
                return
            }
        }
        catch(err){
            console.log(err)
            Toast.show({
                type : 'error',
                position : 'bottom',
                text1 : 'Something went wrong',
                text2 : 'Please try again' ,
                topOffset : 30,
                bottomOffset : 40,
                autoHide : true,
                visibilityTime : toastMessageDuration
            })
            this.setState({
                sending : false
            })
        }

    }

    handleInput = (email) => {
        this.setState({
            email,
        })
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Header 
                      title="Forgot Password" 
                      customClick = {() => this.props.navigation.navigate('Login_CreateAccount')} 
                    />
                    <Text style={{textAlign : 'center'}}>You will receive an email for reseting the password</Text>
                    <TextInput 
                      placeholder="Email"
                      style={styles.input}
                      onChangeText = {(input) => this.handleInput(input)}
                    />
                        <>
                        {this.state.sending ? (
                            <TouchableOpacity style={styles.btn} onPress={() => this.handleSend()}>
                                <LottieView loop={true} autoPlay={true} source={require('../../../assets/Images/loading.json')} />
                                <Text style={styles.btnText}>Sending</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.btn} onPress={() => this.handleSend()}>
                                <Text style={styles.btnText}>Send</Text>
                            </TouchableOpacity> 
                        )}
                        </>
                </View>
            </ScrollView>
        )
    }
}