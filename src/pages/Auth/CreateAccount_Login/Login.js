import React from "react";
import { Text, View, ScrollView , TextInput} from 'react-native'
import { styles } from "./style";
import Icon from 'react-native-vector-icons/Ionicons';
import { mainColor } from "assets/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import {POST} from 'API/index';
import Context from "context/context";
import Toast from 'react-native-toast-message';
import {toastMessageDuration} from 'assets/constants/Units'
import LottieView from 'lottie-react-native';
import { getData, storeData } from "LocalStorage/AsyncStorageData";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Config from "react-native-config";
import { REACT_APP_IOS_CLIENT_ID, REACT_APP_ANDROID_CLIENT_ID } from '../../../assets/constants/General'



export default class Login_CreateAccount extends React.Component{

    static contextType = Context;

    constructor(){
        super();
        this.state={
            countryCode : 'Your Country (Optional)',
            countrySelectorVisibility : false,
            passwordIconNotVisible : 0,
            passwordIconVisible : 1,
            isVisible : true,
            passwordIsSecure : true,

            email : '',
            password : '',

            loggingIn : false,
        }
    }

    validation = () => {
        if(this.state.email == '' || this.state.password == '')
        {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Failed logging in',
                text2: 'Email and Password are required.',
                visibilityTime: toastMessageDuration,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            this.setState({
                loggingIn : false
            })
            return false;
        }
        return true
    }

    handleLogin = async () => {
        
        this.setState({
            loggingIn : true
        })
        
        if(!this.validation()) return;

        POST('/login/user' , {
            email : this.state.email,
            password : this.state.password
        })
        .then(async (res) => {
            const result = await res.text()
            console.log(result)
            if(res.status === 200)
            {
                console.log('logged in');
                // const token = res.headers.map.accesstoken
                const token = result;
                this.context.setIsLogin(true)
                await storeData('accessToken' , token);
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Logged in Successfully',
                    text2: 'Welcome to MyApp',
                    visibilityTime: toastMessageDuration,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                });
                this.setState({
                    loggingIn : false
                })
                const isFirstInstallation = await getData('isFirstInstallation')
                (isFirstInstallation === null) ? 
                this.props.navigation.navigate('Home') : 
                this.props.navigation.navigate('Profile')
            }
            else
            {

                this.setState({
                    loggingIn : false
                })
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: result,
                    text2: 'Please try again',
                    visibilityTime: toastMessageDuration,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                  });
            }
        })
        .catch((err) => 
        {
            this.setState({
                loggingIn : false
            })
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'couldnt connect to server',
                text2: 'Please try again',
                visibilityTime: toastMessageDuration,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
              });
            console.log('couldnt connect to server = ' + err);
        })
    }

    handleLoginWithGoogle = async () => {
        console.log('login with google')

        const iosClientId = REACT_APP_IOS_CLIENT_ID;
        const androidClientId = REACT_APP_ANDROID_CLIENT_ID;

        GoogleSignin.configure({
            androidClientId,
            iosClientId,
        })

        try
        {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.context.setUserName(userInfo.user.givenName)
            this.context.setUserEmail(userInfo.user.email)
            await storeData('accessToken' , 'GoogleToken');
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Logged in Successfully',
                text2: 'Welcome to MyApp',
                visibilityTime: toastMessageDuration,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            this.context.setIsLogin(true)
            this.props.navigation.navigate('Profile');
        }
        catch(err)
        {
            switch(err.code)
            {
                case statusCodes.SIGN_IN_CANCELLED :
                    Toast.show({
                        type : 'error',
                        position : 'bottom',
                        text1 : 'Create Account canceled',
                        text2 : 'Please try again',
                        autoHide : true,
                        visibilityTime : toastMessageDuration,
                        topOffset: 30,
                        bottomOffset: 40,
                    })
                break;
                case statusCodes.IN_PROGRESS : 
                    Toast.show({
                        type : 'error',
                        position : 'bottom',
                        text1 : 'Create Account is in Progress',
                        text2 : 'Please wait',
                        autoHide : true,
                        topOffset : 30,
                        bottomOffset : 40,
                        visibilityTime : toastMessageDuration,
                    })
                break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE : 
                    Toast.show({
                        type : 'error',
                        position : 'bottom',
                        text1 : 'Play services not available',
                        text2 : 'Please try again.',
                        autoHide : true,
                        topOffset : 30,
                        bottomOffset : 40,
                        visibilityTime : toastMessageDuration,
                    })
                break;
            }
        }
    }

    passwordVisibility = () => {
        console.log('tufjhbk')
        if(this.state.isVisible)
        {
            this.setState({
                passwordIconNotVisible : 1,
                passwordIconVisible : 0,
                isVisible : false,
                passwordIsSecure : false
            })
        }
        else
        {
            this.setState({
                passwordIconNotVisible : 0,
                passwordIconVisible : 1,
                isVisible : true,
                passwordIsSecure : true
            })
        }
    }

    handleResetPass = () => {
        this.props.navigation.navigate('ForgetPassword');
    }

    render(){
        return(
            <ScrollView>
               <View style={styles.container}>
                   <Text style={styles.mainTitle}>Login</Text>
                   <View style={styles.input}>
                      <TextInput 
                         style={styles.textInput}
                         placeholder="Email"
                         onChangeText = {(input) => {this.setState({email : input})}}
                         autoCapitalize="none"
                       ></TextInput>
                   </View>
                   <View style={styles.input}>
                      <TextInput 
                         style={styles.textInput}
                         placeholder="Password"
                         secureTextEntry={this.state.passwordIsSecure}
                         onChangeText = {(input) => {this.setState({password : input})}}
                         autoCapitalize="none"
                       >
                       </TextInput>
                       <View style={styles.eyeIconsStyle}>
                          <Icon onPress={() => this.passwordVisibility()} style={[styles.eyeIconStyle , {opacity : this.state.passwordIconNotVisisble}]} name="eye-outline" size={20} color={mainColor} />
                          <Icon onPress={() => this.passwordVisibility()} style={[styles.eyeIconStyle , {opacity : this.state.passwordIconVisible}]} name="eye-off-outline" size={20} color={mainColor} />
                       </View>
                   </View>
                   <TouchableOpacity onPress={() => this.handleResetPass()} style={styles.resetPassword}>
                       <Text style={styles.forgetPassText}>Forgot Your Password?</Text>
                       <Text style={styles.resetText}> Reset</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => this.handleLogin()} style={styles.btn}>
                       <LottieView style={(this.state.loggingIn) ? {opacity : 1} : {opacity : 0}} loop={true} autoPlay={true} source={require('../../../assets/Images/loading.json')} />
                       <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.seperator}>
                        <View style={styles.line}></View>
                        <Text>OR</Text>
                        <View style={styles.line}></View>
                    </View>
   
                   <TouchableOpacity style={styles.googleBtn} onPress={() => this.handleLoginWithGoogle()}>
                       <Icon name="logo-google" size={30} color={mainColor} style={styles.googleLogo} />
                       <Text>Login with Google</Text>
                   </TouchableOpacity>
               </View>
            </ScrollView>
        )
    }
}