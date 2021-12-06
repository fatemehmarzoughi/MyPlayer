import React from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./style";
import Header from "components/pagesHeader/Header";
import Toast from 'react-native-toast-message';
import { toastMessageDuration } from "assets/constants/Units";
import LottieView from 'lottie-react-native';
import {POST} from 'API/index';
import context from 'context/context';
import * as Colors from 'assets/constants/Colors'

export default class ReportABug extends React.Component{

    static contextType = context;

    constructor(){
        super();
        this.state = {
            input : '',
            loading : false,
        }
    }

    handleTextInput = (input) => {
        this.setState({
            input,
        })
    }

    handleReport = async () => {
        this.setState({
            loading : true,
        })
        if(this.state.input === ''){
            Toast.show({
                type : 'error',
                position : 'bottom',
                text1 : 'Text input is empty',
                text2 : 'Please explain the bug.',
                visibilityTime : toastMessageDuration,
                topOffset : 30,
                bottomOffset : 40
            })
            this.setState({
                loading : false,
            })
            return;
        }

        const reqBody = {
            bugExplenation : this.state.input,
        }

        try{
            const result = await POST('/editProfile/reportBug' , reqBody)
            const message = await result.text();
            if(result.status === 200)
            {
                Toast.show({
                    type : 'success',
                    position : 'top',
                    autoHide : true,
                    text1 : message,
                    text2 : 'Thanks for the feedback',
                    visibilityTime : toastMessageDuration,
                    topOffset : 30,
                    bottomOffset : 40
                })
                this.setState({
                    loading : false,
                })
            }
            else
            {                
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
                this.setState({
                    loading : false,
                })
            }
     
            console.log(this.state.loading)

        }catch(err){
            console.log(err)
            Toast.show({
                type : 'error',
                position : 'bottom',
                autoHide : true,
                text1 : 'Something went wrong',
                text2 : 'Please check your network',
                visibilityTime : toastMessageDuration,
                topOffset : 30,
                bottomOffset : 40
            })
            this.setState({
                loading : false,
            })
        }


    }



    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Header theme={this.context.theme} title="Report a Bug" customClick={() => this.props.navigation.navigate('Profile')}/>
                    <TextInput
                    placeholder = "Your explenation goes here ... "
                    placeholderTextColor = {this.context.theme ? Colors.dark : Colors.white}
                    style={styles.input}
                    onChangeText={(input) => this.handleTextInput(input) }
                    />
                    <TouchableOpacity style={styles.btn} onPress={() => this.handleReport()}>
                        <LottieView style={this.state.loading ? {opacity : 1} : {opacity : 0}} autoPlay={true} loop={true} source={require('../../../assets/Images/loading.json')} />
                        <Text style={styles.btnText}>Report</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}