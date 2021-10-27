import React from "react";
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity, Modal } from "react-native";
import Header2 from "../../../components/pagesHeader/Header2";
import {styles} from './style';

export default class EditProfile extends React.Component{

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
                          placeholder = "Name"
                          style={styles.input}
                        />
                        <TextInput
                          placeholder = "Email"
                          style={styles.input}
                        />
                        <TextInput
                          placeholder = "Select Your Country"
                          style={styles.input}
                        />
                    </View>
                    <TouchableOpacity onPress={() => this.showModal()} style={styles.deleteBtn}>
                        <Text style={styles.deleteBtnText}>Delete Account</Text>
                    </TouchableOpacity>
                    <Modal
                     visible={this.state.modalVisible}
                     transparent={true}
                     animationType="slide"
                     onRequestClose={() => this.cancelModal()}
                    >
                        <View style={styles.modalStyle}>
                          <Text style={styles.textColor}>Are you sure, you want to delete your account?</Text>
                          <View style={styles.btns}>
                             <TouchableOpacity style={styles.btnStyle} onPress={() => this.handleDeleteAccount()}>
                                 <Text style={styles.textColor}>Delete Account</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.btnStyle} onPress={() => this.cancelModal()}>
                                 <Text style={styles.textColor}>Cancel</Text>
                             </TouchableOpacity>
                          </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        )
    }
}