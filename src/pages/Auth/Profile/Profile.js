import React from "react";
import { View, Text, Image, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import {GET} from '../../../API/index'
import { dark, gray, mainColor, white } from "../../../assets/constants/Colors";
import { styles } from "./style";
// import realm from "../../../Realm/realmConnection";
import Context from "../../../context/context";
import ToggleSwitch from 'toggle-switch-react-native'
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import {toastMessageDuration} from '../../../assets/constants/Units'
import ModalClass from "../../../components/Modal";

export default class Profile extends React.Component{

    static contextType = Context;

    constructor(){
        super();
        this.state={
            email : '',
            plan : '',
            name : '',
            country : '',

            // appNotification : (realm.objects('Notification')[0].appNotification === 'true') ? true : false,
            refreshing : false,
            modalVisible : false,
        }
    }

    EditProfile = () => {
        this.props.navigation.navigate('EditProfile');
    }

    handleResetPassword = () => {
        this.props.navigation.navigate('ResetPassword');
    }

    showLogoutMessage = () => {
        this.setState({
            modalVisible : true,
        })
    }

    cancelModal = () => {
        console.log('cancel modal')
        this.setState({
            modalVisible : false,
        })
    }

    handleLogOut = () => {

        // realm.write(() => {
        //     realm.delete(realm.objects('Authentication')[0]);
        //     console.log('deleted')
        // })
        this.context.setIsLogin(false);
        // this.props.navigation.navigate('home')
        this.setState({
            modalVisible : false,
        })
        this.props.navigation.navigate('Auth')

    }

    handleReportABug = () => {
        this.props.navigation.navigate('ReportABug')
    }

    handleUpgradeToPremium = () => {
        this.props.navigation.navigate('UpgradeToPremium')
    }

    setAppNotification = async () => {
        let newState = '' + !this.state.appNotification + '';
        // realm.write(() => {
        //     let object = realm.objects('Notification')[0];
        //     object.appNotification = newState
        // })
        this.setState({
            appNotification : !this.state.appNotification
        })
    }

    getUserInfo = async () => {
        console.log(this.state.name)
        console.log(this.state.email)
        try{
            const res = await GET('/dashboard' , '');
            this.setState({
                email : res.headers.map.email,
                name : res.headers.map.firstname,
                plan : res.headers.map.plan,
                country : res.headers.map.country,
                refreshing : false,
            })
            this.context.setUserName(this.state.name)
            this.context.setUserEmail(this.state.email)
            this.context.setUserCountry(this.state.country)
        }
        catch{
            (err) => console.log(err)
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: "Couldn't refresh!",
                text2: 'Please Check your Network',
                visibilityTime: toastMessageDuration,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
            this.setState({refreshing : false})
        }
    }

    async componentDidMount (){

        // await Realm.open({ path : 'Database.realm' })

        this.getUserInfo();
        console.log(this.state.name)
        console.log(this.state.email)
        
    }

    componentWillUnmount(){
        // realm.close();
    }
    
    render(){
        return(
            <ScrollView
            refreshControl={
                <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.getUserInfo()}
                />
            }
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <View style={styles.row1}>
                        <Image style={styles.profileImg} source={require('../../../assets/Images/Windows-11.jpeg')} />
                        <View style={styles.nameEmail}>
                            <>
                            {((this.state.email === '' && this.state.name === '') || (this.state.email === undefined && this.state.name === undefined)) ? (
                                <>
                                    <LottieView style={styles.loadingIcon} loop={true} autoPlay={true} source={require('../../../assets/Images/loading2.json')} />
                                </>
                            ) : (
                                <>
                                    <View style={styles.name}>
                                        <Icon2 name="person" size={25}  />
                                        <Text style={styles.nameText}>{this.state.name}</Text>
                                    </View>
                                    <Text style={styles.email}>{this.state.email}</Text>
                                </>
                            )}
                            </>
                        </View>
                    </View>
                    <View style={styles.row2}>
                        <View style={styles.My}>
                            <Text style={styles.MyText}>12</Text>
                            <Text style={styles.MyText}>My Saved</Text>
                        </View>
                        <View style={styles.My}>
                            <Text style={styles.MyText}>2</Text>
                            <Text style={styles.MyText}>My playlist</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.EditProfile()} style={styles.editProfile}>
                            <Icon name="pencil" size={20} color={white} />
                            <Text style={styles.editProfileText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    
                    <View style={styles.seperators}>
                        <Text style={styles.seperator}></Text>
                        <Text style={styles.seperator}></Text>
                    </View>

                    <View style={styles.part}>
                        <Text style={styles.subTitle}>Account Settings</Text>
                        <TouchableOpacity onPress={() => this.handleUpgradeToPremium()} style={styles.option}>
                            <View style={styles.optionTitleIcon}>
                               <Icon2 name="logo-usd" size={20} color={dark}/>
                               <Text style={styles.optionTitle}>Upgrade to premium</Text>
                            </View>
                            <Icon name="chevron-right" size={35} color={dark}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleResetPassword()} style={styles.option}>
                            <View style={styles.optionTitleIcon}>
                               <Icon2 name="basket" size={20} color={dark}/>
                               <Text style={styles.optionTitle}>Reset Password</Text>
                            </View>
                            <Icon name="chevron-right" size={35} color={dark}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleReportABug()} style={styles.option}>
                            <View style={styles.optionTitleIcon}>
                               <Icon2 name="bug" size={20} color={dark}/>
                               <Text style={styles.optionTitle}>Report a Bug</Text>
                            </View>
                            <Icon name="chevron-right" size={35} color={dark}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.premiumOption}>
                            <View style={styles.premium}>
                                <View style={styles.optionTitleIcon}>
                                   <Icon2 name="bookmark" size={20} color={gray}/>
                                   <Text style={styles.premiumOptionTitle}>Restore my Saved</Text>
                                </View>
                                <Icon name="chevron-right" size={35} color={gray}/>
                            </View>
                            <Text style={styles.premiumOptionText}>Only available in premium accounts</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.part}>
                        <Text style={styles.subTitle}>Notifications</Text>

                        <TouchableOpacity style={styles.premiumOption}>
                            <View style={styles.premium}>
                                <View style={styles.optionTitleIcon}>
                                   <Icon2 name="mail" size={20} color={gray}/>
                                   <Text style={styles.premiumOptionTitle}>Email Notification</Text>
                                </View>
                                {/* <Icon2 name="toggle" size={35} color={gray}/> */}
                                <ToggleSwitch
                                  isOn={true}
                                  onColor={gray}
                                  offColor={gray}
                                  size="small"
                                  onToggle={() => {}}
                                />
                            </View>
                            <Text style={styles.premiumOptionText}>Only available in premium accounts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setAppNotification()} style={styles.option}>
                            <View style={styles.optionTitleIcon}>
                               <Icon2 name="alarm" size={20} color={dark}/>
                               <Text style={styles.optionTitle}>App notification</Text>
                            </View>
                            <ToggleSwitch
                              isOn={this.state.appNotification}
                              onColor={mainColor}
                              offColor={dark}
                              size="small"
                              onToggle={() => this.setAppNotification()}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.part}>
                        <Text style={styles.subTitle}>Setup</Text>
                        <TouchableOpacity onPress={() => this.showLogoutMessage()} style={styles.option}>
                            <View style={styles.optionTitleIcon}>
                               <Icon2 name="power" size={20} color={mainColor}/>
                               <Text style={styles.optionTitle}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ModalClass 
                      question="Are you sure, you want to logout?" 
                      modalVisible={this.state.modalVisible} 
                      btnTitle="Logout"
                      handleMainBtn = {() => this.handleLogOut()}
                      handleCancelBtn = {() => this.cancelModal()}
                    />
                    {/* <Modal 
                       visible={this.state.modalVisible}
                       transparent={true}
                       animationType="slide"
                       onRequestClose={() => this.cancelModal()}
                       >
                           <View style={styles.modalStyle}>
                              <Text style={styles.textColor}>Are you sure, you want to logout?</Text>
                              <View style={styles.btns}>
                                 <TouchableOpacity style={styles.btnStyle} onPress={() => this.handleLogOut()}>
                                     <Text style={styles.textColor}>Logout</Text>
                                 </TouchableOpacity>
                                 <TouchableOpacity style={styles.btnStyle} onPress={() => this.cancelModal()}>
                                     <Text style={styles.textColor}>Cancel</Text>
                                 </TouchableOpacity>
                              </View>
                           </View>
                    </Modal> */}
                </View>
            </ScrollView>
        )
    }
}