import React from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Header from "../../../components/pagesHeader/Header";
import { styles } from "./style";

export default class ForgetPassword extends React.Component{

    constructor(){
        super();
        this.state = { 
            email : '',
        }
    }

    handleInput = (email) => {
        this.setState({
            email,
        })
        console.log(email)
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Header 
                      title="Reset Password" 
                      customClick = {() => this.props.navigation.navigate('Login_CreateAccount')} 
                    />
                    <Text>You will receive an email for reseting the password</Text>
                    <TextInput 
                      placeholder="Email"
                      style={styles.input}
                      onChangeText = {(input) => this.handleInput(input)}
                    />
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}