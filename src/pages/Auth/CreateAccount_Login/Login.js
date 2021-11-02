import React from "react";
import { Text, View, ScrollView , TextInput} from 'react-native'
import { styles } from "./style";
import Icon from 'react-native-vector-icons/Ionicons';
import { mainColor } from "../../../assets/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import {POST} from '../../../API/index';
import Context from "../../../context/context";
// import realm from "../../../Realm/realmConnection";
import Toast from 'react-native-toast-message';
import {toastMessageDuration} from '../../../assets/constants/Units'
import LottieView from 'lottie-react-native';
// import Realm from 'realm';



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

    handleLogin = async () => {

        this.setState({
            loggingIn : true
        })

        POST('/login/user' , {
            email : this.state.email,
            password : this.state.password
        })
        .then((res) => {
            if(res.status === 200)
            {
                console.log('logged in');
                // console.log('token = ' + JSON.stringify(res.headers.map.accesstoken))
                const token = res.headers.map.accesstoken
                console.log(token)
                this.context.setIsLogin(true)
                // Realm.open({ path : 'Database.realm',})
                // try{
                    // realm.write(() => {
                    //     realm.create('Authentication' , {
                    //         accessToken : token
                    //     })
                    // })
                    // Realm.close()
                    // realm.close()
                    // console.log('realm auth = ' + JSON.stringify(realm.objects('Authentication')[0]))
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
                    (this.context.isFirstInstallation) ? 
                    this.props.navigation.navigate('Home') : 
                    this.props.navigation.navigate('Profile')
                // }
                // catch
                // {
                //     (err) => console.log(err)
                //     Toast.show({
                //         type: 'error',
                //         position: 'bottom',
                //         text1: 'Something went wrong',
                //         text2: 'Please try again',
                //         visibilityTime: toastMessageDuration,
                //         autoHide: true,
                //         topOffset: 30,
                //         bottomOffset: 40,
                //     });
                // }

            }
            else
            {
                this.setState({
                    loggingIn : false
                })
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: res.headers.map.errormsg,
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
            console.log('couldnt connect to server = ' + JSON.stringify(err));
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: "Something went wrong.",
                text2: 'Please try again',
                visibilityTime: toastMessageDuration,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
              });
        })
    }

    handleLoginWithGoogle = () => {
        console.log('login with google')
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
                       ></TextInput>
                   </View>
                   <View style={styles.input}>
                      <TextInput 
                         style={styles.textInput}
                         placeholder="Password"
                         secureTextEntry={this.state.passwordIsSecure}
                         onChangeText = {(input) => {this.setState({password : input})}}
                       >
                       </TextInput>
                       <View style={styles.eyeIconsStyle}>
                          <Icon onPress={() => this.passwordVisibility()} style={[styles.eyeIconStyle , {opacity : this.state.passwordIconNotVisisble}]} name="eye-outline" size={20} color={mainColor} />
                          <Icon onPress={() => this.passwordVisibility()} style={[styles.eyeIconStyle , {opacity : this.state.passwordIconVisible}]} name="eye-off-outline" size={20} color={mainColor} />
                       </View>
                   </View>
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
                       <Text>Login with google</Text>
                   </TouchableOpacity>
               </View>
            </ScrollView>
        )
    }
}