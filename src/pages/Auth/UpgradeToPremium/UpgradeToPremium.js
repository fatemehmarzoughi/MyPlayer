import React from "react";
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { toastMessageDuration } from "assets/constants/Units";
import Icon from "react-native-vector-icons/Ionicons";
import * as Colors from "assets/constants/Colors";
import Header from 'components/pagesHeader/Header'
import { styles } from "./style";
import { POST } from 'API/index';
import {changeColor} from 'components/lightDarkTheme'
import context from 'context/context'

export default class UpgradeToPremium extends React.Component{

    static contextType = context;

    constructor(){
        super();
        this.state= { 
            selectedPlan : 1,
        }
    }

    selectPlan = (id) => {
        this.setState({
            selectedPlan : id,
        })
    }

    handleSelectPlan = async () => {
        // const url = 'http://www.google.com';

        // const canOpen = await Linking.canOpenURL(url);
        // console.log(canOpen)
        // if(!canOpen) {
        //     Toast.show({
        //         type: 'error',
        //         position: 'bottom',
        //         text1: "Something went wrong",
        //         text2: 'Please Report this as a bug',
        //         visibilityTime: toastMessageDuration,
        //         autoHide: true,
        //         topOffset: 30,
        //         bottomOffset: 40,
        //     })
        //     return;
        // }

        // await Linking.openURL(url);

        const reqBody = {
            planId : this.state.selectedPlan
        }

        try{
            const result = await POST('/editProfile/changePlan' , reqBody)
            const messageText = await result.text();
            if(result.status === 200)
                Toast.show({
                    type : 'success',
                    position : 'top',
                    text1 : messageText,
                    text2 : 'Your Account upgraded successfully',
                    visibilityTime : toastMessageDuration,
                    bottomOffset : 40,
                    topOffset : 30,
                    autoHide: true,
                })
            else
                Toast.show({
                    type : 'error',
                    position : 'bottom',
                    text1 : messageText,
                    text2 : 'Please try again.',
                    visibilityTime : toastMessageDuration,
                    bottomOffset : 40,
                    topOffset : 30,
                    autoHide: true,
                })
        }
        catch(err) {
            console.log(err)
            Toast.show({
                type : 'error',
                position : 'bottom',
                text1 : 'Something went wrong',
                text2 : 'Please try again',
                visibilityTime : toastMessageDuration,
                bottomOffset : 40,
                topOffset : 30,
                autoHide: true,
            })
        }

    }

    render()
    {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Header theme={this.context.theme} title="Choose Your Plan" customClick={() => this.props.navigation.navigate('Profile')} />
                    <Text style={styles.subTitle}>By choosing our premium account, you can watch with no ads.</Text>
                    <View style={styles.plans}>
                        <TouchableOpacity onPress={() => this.selectPlan(1)} style={[styles.plan , (this.state.selectedPlan == 1) ? {borderColor : Colors.mainColor, borderWidth : 3,} : {borderColor : Colors.gray, borderWidth : 1,}]}>
                            <Icon name="checkmark-outline" size={45} color={(this.state.selectedPlan == 1) ? Colors.mainColor : Colors.gray} />
                            <View style={styles.planTitle}>
                                <Text style={[styles.planTitleText, changeColor(this.context.theme) , (this.state.selectedPlan == 1) ? {fontWeight : 'bold'} : {fontWeight : 'normal'}]}>30Days</Text>
                                <Text style={[styles.planTitleText, changeColor(this.context.theme) , (this.state.selectedPlan == 1) ? {fontWeight : 'bold'} : {fontWeight : 'normal'}]}>12$</Text>
                            </View>
                            <Text style={[styles.planSubTitle , (this.state.selectedPlan == 1) ? {color : Colors.mainColor} : {color : Colors.gray}]}>Premium Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectPlan(2)} style={[styles.plan , (this.state.selectedPlan == 2) ? {borderColor : Colors.mainColor, borderWidth : 3,} : {borderColor : Colors.gray, borderWidth : 1,}]}>
                            <Icon name="checkmark-outline" size={45} color={(this.state.selectedPlan == 2) ? Colors.mainColor : Colors.gray} />
                            <View style={styles.planTitle}>
                                <Text style={[styles.planTitleText, changeColor(this.context.theme) , (this.state.selectedPlan == 2) ? {fontWeight : 'bold'} : {fontWeight : 'normal'}]}>30Days</Text>
                                <Text style={[styles.planTitleText, changeColor(this.context.theme) , (this.state.selectedPlan == 2) ? {fontWeight : 'bold'} : {fontWeight : 'normal'}]}>12$</Text>
                            </View>
                            <Text style={[styles.planSubTitle , (this.state.selectedPlan == 2) ? {color : Colors.mainColor} : {color : Colors.gray}]}>Premium Account</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.handleSelectPlan()} style={styles.btn}>
                        <Text style={styles.btnText}>Select Plan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}