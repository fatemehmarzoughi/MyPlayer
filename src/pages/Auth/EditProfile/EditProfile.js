import React from "react";
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Header2 from "../../../components/pagesHeader/Header2";
import {styles} from './style';
import Context from "../../../context/context";
import ModalClass from "../../../components/Modal";

export default class EditProfile extends React.Component{

    static contextType = Context;

    constructor(){
        super();
        this.state = {
            modalVisible : false,
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

    handleDeleteAccount = () => {
        console.log('deleted account')
    }

    showModal = () => {
        this.setState({
            modalVisible : true,
        })
    }

    render()
    {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Header2 
                      title="Edit Profile" 
                      onCancel={() => this.onCancel()} 
                      onSave={() => {}} 
                    />
                    <Image style={styles.image} source={require('../../../assets/Images/Windows-11.jpeg')} />
                    <Text onPress={() => this.changeProfilePhoto()} style={styles.changePhoto}>Change Profile Photo</Text>
                    <View style={styles.inputs}>
                        <TextInput
                          placeholder = {this.context.userName}
                          style={styles.input}
                        />
                        <TextInput
                          placeholder = {this.context.userEmail}
                          style={styles.input}
                        />
                        <TextInput
                          placeholder = {this.context.userCountry}
                          style={styles.input}
                        />
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
                </View>
            </ScrollView>
        )
    }
}