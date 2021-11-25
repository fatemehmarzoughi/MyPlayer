import React from "react";
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Header2 from "components/pagesHeader/Header2";
import {styles} from './style';
import Context from "context/context";
import ModalClass from "components/Modals/QuestionBoxModal";
import SavingModal from "components/Modals/SavingBoxModal";
import CountryPicker from 'react-native-country-picker-modal'
import Icon from "react-native-vector-icons/EvilIcons";
import { gray } from "assets/constants/Colors";
import {DELETE} from 'API/index'
import { storeData } from "LocalStorage/AsyncStorageData";
import {POST} from 'API/index'
import Toast from "react-native-toast-message";
import { toastMessageDuration } from "assets/constants/Units";


export default class EditProfile extends React.Component{

    static contextType = Context;

    constructor(){
        super();
        this.state = {
            modalVisible : false,
            countrySelectorVisibility : false,
            choosedCountry : '',
            name : '',
            email : '',
            saving : false,
        }
    }

    changeProfilePhoto = () => {
        this.props.navigation.navigate('ChangeProfilePhoto');
    }

    onCancel = () => {
        this.props.navigation.navigate('Profile')
    }

    cancelModal = () => {
        console.log('cancel modal')
        this.setState({
            modalVisible : false
        })
    }

    handleDeleteAccount = async () => {
        try{

            const result = await DELETE('/editProfile/deleteAccount');
            const message = await result.text();
            console.log(message);
            if(result.status === 200)
            {
                await storeData('accessToken' , '');
                this.context.setIsLogin(false);
                this.props.navigation.navigate('Auth');
                Toast.show({
                    type : 'success',
                    position : 'top',
                    text1 : message,
                    text2 : '',
                    topOffset : 30,
                    bottomOffset : 40,
                    visibilityTime : toastMessageDuration,
                    autoHide : true
                })
            }
            else
            {
                Toast.show({
                    type : 'error',
                    position : 'bottom',
                    text1 : message,
                    text2 : 'Please try again',
                    topOffset : 30,
                    bottomOffset : 40,
                    visibilityTime : toastMessageDuration,
                    autoHide : true
                })
            }

        }
        catch(err){
            console.log(err)
        }

    }

    showModal = () => {
        this.setState({
            modalVisible : true,
        })
    }

    handleName = (name) => {
        this.setState({
            name,
        })
    }
    handleEmail = (email) => {
        this.setState({
            email,
        })
    }

    onSave = async () => {

        this.setState({
            saving : true
        })

        const reqBodyUserInfo = { 
            name : this.state.name,
            email : this.state.email,
            country : this.state.choosedCountry,
            imageURL :  this.context.userImage ,
        }

        try{

            //saving the users info (name, email, country)
            const result = await POST('/editProfile/setInfo' , reqBodyUserInfo);
            const message = await result.text();

            if(result.status === 200)
            {
                Toast.show({
                    type : 'success',
                    position : 'top',
                    text1 : message,
                    text2 : 'Saved changes',
                    autoHide : true,
                    visibilityTime : toastMessageDuration,
                    topOffset : 30,
                    bottomOffset : 40,
                })
                this.setState({
                    saving : false
                })
                this.props.navigation.navigate('Profile')

            }
            else {
                Toast.show({
                    type : 'error',
                    position : 'bottom',
                    text1 : message,
                    text2 : 'Please try again',
                    autoHide : true,
                    visibilityTime : toastMessageDuration,
                    topOffset : 30,
                    bottomOffset : 40,
                })
                this.setState({
                    saving : false
                })
            }

        }catch(err){
            console.log(err);
            Toast.show({
                type : 'error',
                position : 'bottom',
                text1 : 'Something went wrong',
                text2 : 'Please check your internet connection',
                autoHide : true,
                visibilityTime : toastMessageDuration,
                topOffset : 30,
                bottomOffset : 40,
            })
            this.setState({
                saving : false
            })
        }


    }
 
    render()
    {

        return(
            <ScrollView>
                <View style={[styles.container]}>
                    <Header2 
                      title="Edit Profile" 
                      onCancel={() => this.onCancel()} 
                      onSave={() => this.onSave()} 
                    />
                    <Image style={styles.image} source={{uri : this.context.userImage}} />
                    <Text onPress={() => this.changeProfilePhoto()} style={styles.changePhoto}>Change Profile Photo</Text>
                    <View style={styles.inputs}>
                        <TextInput
                          placeholder = {this.context.userName}
                          style={styles.input}
                          onChangeText={(input) => this.handleName(input)}
                        />
                        <TextInput
                          placeholder = {this.context.userEmail}
                          style={styles.input}
                          onChangeText={(input) => this.handleEmail(input)}
                        />
                        <TouchableOpacity style={styles.input} onPress={() => this.setState({ countrySelectorVisibility : true })}>
                            <CountryPicker 
                            theme={{
                                primaryColor : 'red'
                            }}
                             preferredCountries={['US', 'IR']}
                             withFilter={true}
                             withCountryNameButton={true}
                             withFlag={true}
                             withEmoji={true}
                             placeholder={(this.state.choosedCountry === '') ? this.context.userCountry : this.state.choosedCountry}
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
                            <Icon name="chevron-down" size={40} color={gray}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.showModal()} style={styles.deleteBtn}>
                        <Text style={styles.deleteBtnText}>Delete Account</Text>
                    </TouchableOpacity>
                    <ModalClass 
                      question="Are you sure, you want to delete your account?" 
                      modalVisible={this.state.modalVisible} 
                      btnTitle="Delete Account"
                      handleMainBtn = {() => this.handleDeleteAccount()}
                      handleCancelBtn = {() => this.cancelModal()}
                    />
                    <SavingModal
                     modalVisible = {this.state.saving}
                    />
                </View>
            </ScrollView>
        )
    }
}