import React from "react";
import { Text, View, ScrollView , TextInput, FlatList} from 'react-native'
import { styles } from "./style";
import Icon from 'react-native-vector-icons/Ionicons';
import { gray, mainColor } from "../../../assets/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import CountryPicker from 'react-native-country-picker-modal'
import {validateEmail , validatePassword} from './validation';
import {POST} from "../../../API/index";
import Toast from 'react-native-toast-message';
import {toastMessageDuration} from '../../../assets/constants/Units'
import LottieView from 'lottie-react-native';
import Icon2 from "react-native-vector-icons/EvilIcons";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { storeData } from "../../../LocalStorage/AsyncStorageData";


export default class Login_CreateAccount extends React.Component{

    constructor(){
        super();
        this.state={
            countryCode : 'Your Country (Optional)',
            countrySelectorVisibility : false,
            passwordIconNotVisible : 0,
            passwordIconVisible : 1,
            isVisible : true,
            passwordIsSecure : true,

            activeColor : mainColor,
            notActiveColor : gray,

            activeWeight : 'bold',
            notActiveWeight : 'normal',

            selectedId : 0,

            plans : [
                {
                    id : 0,
                    name : 'Free',
                    price : '0.0$',
                    description : 'Free Account'
                },
                {
                    id : 1,
                    name : '30 Days',
                    price : '30.0$',
                    description : 'Premium Account'
                },
                {
                    id : 2,
                    name : '365 Days',
                    price : '9.0$',
                    description : 'Premium Account'
                }
            ],


            name : '',
            email : '',
            password : '',
            choosedCountry : '',
            choosedPlan : 0,

            nameErrorMessage : '',
            nameErrorDisplay : 'none',

            emailErrorMessage : '',
            emailErrorDisplay : 'none',
            passwordErrorDisplay : 'none',

            createingAccount : false,
        }
    }

    passwordVisibility = () => {
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

    selectPlan = (id) => {
        this.setState({
            selectedId : id,
            choosedPlan : id,
        })
    }

    handleNameInput = (input) => {
        this.setState({
            name : input,
        })
    }
    handleEmailInput = (input) => {
        this.setState({
            email : input,
        })
    }
    handlePasswordInput = (input) => {
        this.setState({
            password : input,
        })
    }

    inputValidation = () => {
        let nameIsValid = false;
        let emailIsValid = false;
        let passwordIsValid = false;

        //name validation
        if(this.state.name === '')
        {
            this.setState({
                nameErrorDisplay : 'flex',
                nameErrorMessage : 'Name is required'
            })
            nameIsValid = false;
        }
        else if(this.state.name.length < 2)
        {
            this.setState({
                nameErrorDisplay : 'flex',
                nameErrorMessage : 'Name must be more than 2 characters',
            })
            nameIsValid = false;
        }
        else
        {
            this.setState({
                nameErrorDisplay : 'none'
            })
            nameIsValid = true;
        }


        //email validation
        if(this.state.email === '')
        {
            this.setState({
                emailErrorDisplay : 'flex',
                emailErrorMessage : 'Email is required'
            })
            emailIsValid = false;
        }
        else if(!validateEmail(this.state.email)){
            this.setState({
                emailErrorDisplay : 'flex',
                emailErrorMessage : 'Please Enter a Valid Email'
            })
            emailIsValid = false;
        }
        else
        {
            this.setState({
                emailErrorDisplay : 'none'
            })
            emailIsValid = true;
        }

        //password validation
        if(this.state.password === '')
        {
            this.setState({
                passwordErrorMessage : 'Password is required',
                passwordErrorDisplay : 'flex'
            })
            passwordIsValid = false;
        }
        else if(!validatePassword(this.state.password))
        {
            this.setState({
                passwordErrorMessage : 'Password must be at least 5, at most 20 characters',
                passwordErrorDisplay : 'flex'
            })
            passwordIsValid = false;
        }
        else 
        {
            this.setState({
                passwordErrorDisplay : 'none'
            })
            passwordIsValid = true;
        }

        const result = (nameIsValid && emailIsValid && passwordIsValid)
        return result;
    }


    handleCreateAccount  = () => {

        this.setState({
            createingAccount : true
        })

        console.log(this.state.email)

        if(!this.inputValidation()) return;

        POST('/signin/addUser' , {
            firstName : this.state.name,
            email : this.state.email,
            password : this.state.password,
            plan : this.state.choosedPlan,
            country : this.state.choosedCountry
        })
        .then((res) => {
            console.log(res.status)
            if(res.status === 200)
            {
                this.setState({
                    createingAccount : false
                })
                Toast.show({
                  type: 'success',
                  position: 'top',
                  text1: 'Registered Successfully',
                  text2: 'Please Login',
                  visibilityTime: toastMessageDuration,
                  autoHide: true,
                  topOffset: 30,
                  bottomOffset: 40,
                });
            }
            else 
            {
                this.setState({
                    createingAccount : false
                })
                console.log(JSON.stringify(res.headers.map.errormsg))
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
        .catch((err) => {
            this.setState({
                createingAccount : false
            })
            console.log(err)
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: "Something went wrong",
                text2: 'Please try again',
                visibilityTime: toastMessageDuration,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
              });
        })

    }
    handleCreateAccountWithGoogle = async () => {
        console.log('create account with google');

        const iosClientId = '630054268059-506r6g9fq6latvlc5g158g5b69l4gkqm.apps.googleusercontent.com';
        const androidClientId = '630054268059-7790a4rn17bj5o5heaua0qtn4ttesd6c.apps.googleusercontent.com'

        GoogleSignin.configure({
            androidClientId,
            iosClientId,
        })

        try
        {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            await storeData('accessToken' , 'GoogleToken');
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Registered Successfully',
                text2: 'Please Login',
                visibilityTime: toastMessageDuration,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });

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

    render(){
        return(
            <ScrollView>
               <View style={styles.container}>
                   <Text style={styles.mainTitle}>Create Account</Text>
                   <View style={styles.input}>
                       <TextInput 
                         style={styles.textInput}
                         placeholder="Name"
                         onChangeText = {(input) => this.handleNameInput(input)}
                       ></TextInput>
                       <Text style={[styles.errorMessage , {display : this.state.nameErrorDisplay}]}>{this.state.nameErrorMessage}</Text>
                   </View>
                   <View style={styles.input}>
                      <TextInput 
                         style={styles.textInput}
                         placeholder="Email"
                         onChangeText = {(input) => this.handleEmailInput(input)}
                         autoCapitalize="none"
                       ></TextInput>
                       <Text style={[styles.errorMessage , {display : this.state.emailErrorDisplay}]}>{this.state.emailErrorMessage}</Text>
                   </View>
                   <View style={styles.input}>
                      <TextInput 
                         style={styles.textInput}
                         placeholder="Password"
                         secureTextEntry={this.state.passwordIsSecure}
                         onChangeText = {(input) => this.handlePasswordInput(input)}
                       >
                       </TextInput>
                       <View style={styles.eyeIconsStyle}>
                          <Icon onPress={() => this.passwordVisibility()} style={[styles.eyeIconStyle , {opacity : this.state.passwordIconNotVisisble}]} name="eye-outline" size={20} color={mainColor} />
                          <Icon onPress={() => this.passwordVisibility()} style={[styles.eyeIconStyle , {opacity : this.state.passwordIconVisible}]} name="eye-off-outline" size={20} color={mainColor} />
                       </View>
                       <Text style={[styles.errorMessage , {display : this.state.passwordErrorDisplay}]}>{this.state.passwordErrorMessage}</Text>
                   </View>
                   <View style={styles.input}>
                       <TouchableOpacity 
                         style={styles.picker}
                         onPress={() => {
                            this.setState({countrySelectorVisibility : true
                         })}}
                         >
                           <Icon2 name="chevron-down" size={40} color={gray} />
                           <View 

                           >
                               <Text style={styles.text}>{this.state.countryCode}</Text>
                               {/* <Icon2 name="chevron-down" size={40} color={gray}/> */}
    
                           </View>
                       </TouchableOpacity>
                       <CountryPicker 
                        preferredCountries={['US', 'GB']}
                        withFilter={true}
                        withCountryNameButton={true}
                        withFlag={true}
                        withEmoji={true}
                        placeholder=""
                        onSelect={(val) => {
                            this.setState({
                                countryCode: val.name,
                                choosedCountry : val.name,
                            });
                            this.setState({countryFlag : val.flag})
                        }}
                        onClose = {() => {
                            this.setState({
                                countrySelectorVisibility : false,
                            })
                        }}
                        
                         visible = {this.state.countrySelectorVisibility}
                       />
                   </View>
                   <View style={styles.planSection}>
                       <Text style={styles.planTitle}>Choose Your Plan</Text>
                       <Text style={styles.planSubTitle}>By choosing our premium account, you can watch with no ads.</Text>
                       <FlatList 
                         style = {styles.plansFlatlist}
                         horizontal
                         keyExtractor={(item, index) => index.toString()}
                         data={this.state.plans}
                         renderItem = {({item}) => (
                             <TouchableOpacity 
                               onPress={() => this.selectPlan(item.id)} 
                               style={[
                                   styles.planContainer ,
                                   this.state.selectedId === item.id ? {borderColor : this.state.activeColor, borderWidth : 3.5} : {borderColor : this.state.notActiveColor}]}
                            >
                                 <Icon 
                                   style={[
                                       styles.planIcon ,
                                       this.state.selectedId === item.id ? {color : this.state.activeColor} : {color : this.state.notActiveColor}]} 
                                       name="checkmark-outline" 
                                       size={60}
                                />
                                 <View style={styles.planTextContainer}>
                                    <Text 
                                      style={[
                                          styles.planText ,
                                          this.state.selectedId === item.id ? {fontWeight : this.state.activeWeight} : {fontWeight : this.state.notActiveWeight}]}
                                    >
                                              {item.name}
                                    </Text>
                                    <Text 
                                      style={[
                                          styles.planText ,
                                          this.state.selectedId === item.id ? {fontWeight : this.state.activeWeight} : {fontWeight : this.state.notActiveWeight}]}
                                    >
                                              {item.price}
                                    </Text>
                                 </View>
                                 <Text 
                                   style={[
                                       styles.description ,
                                       this.state.selectedId === item.id ? {color : this.state.activeColor} : {color : this.state.notActiveColor}]}
                                >
                                           {item.description}
                                    </Text>
                             </TouchableOpacity>
                         )}
                        />
                   </View>
                   <TouchableOpacity style={styles.btn} onPress={() => this.handleCreateAccount()}>
                       <LottieView style={(this.state.createingAccount) ? {opacity : 1} : {opacity : 0}} loop={true} autoPlay={true} source={require('../../../assets/Images/loading.json')} />
                       <Text style={styles.btnText}>Create Account</Text>
                    </TouchableOpacity>

                    <View style={styles.seperator}>
                        <View style={styles.line}></View>
                        <Text>OR</Text>
                        <View style={styles.line}></View>
                    </View>
   
                   <TouchableOpacity onPress={() => this.handleCreateAccountWithGoogle()} style={styles.googleBtn}>
                       <Icon name="logo-google" size={30} color={mainColor} style={styles.googleLogo} />
                       <Text>Join with google for free</Text>
                   </TouchableOpacity>
               </View>
            </ScrollView>
        )
    }
}