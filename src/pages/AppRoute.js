import 'react-native-gesture-handler';
import React , { useEffect, useContext } from "react";
import Context from '../context/context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EnteriesOptions from "./EnteriesOptions/EnteriesOptions";
import OnBoarding from "./onBoarding/onBoarding";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from './Home/Home';
import Profile from './Auth/Profile/Profile';

import Login from './Auth/CreateAccount_Login/Login'
import ReportABug from './Auth/Report-a-Bug/ReportABug'
import CreateAccount from './Auth/CreateAccount_Login/CraeteAccount'
import ResetPassword from './Auth/ResetPassword/ResetPassword';
import ForgetPassword from './Auth/ForgetPassword/ForgetPassword';
import EditProfile from '../pages/Auth/EditProfile/EditProfile'
import ChangeProfilePhoto from './Auth/ChangeProfilePhoto/ChangeProfilePhoto'
import { styles } from './Auth/CreateAccount_Login/style';
import { mainColor } from '../assets/constants/Colors';
import UpgradeToPremium from './Auth/UpgradeToPremium/UpgradeToPremium';
import { getData } from '../LocalStorage/AsyncStorageData';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function Login_CreateAccount(){
    return (
        <Tab.Navigator style={styles.topTabBar}
         screenOptions={{
            tabBarActiveTintColor : mainColor,
            tabBarInactiveTintColor : 'gray',
            tabBarPressColor : 'gray',
            tabBarStyle: { padding : 5, shadowColor : mainColor, elevation:0},
            tabBarIndicatorStyle : { backgroundColor : mainColor, elevation:0}
         }}
        >
            <Tab.Screen 
             screenOptions={{
                title : 'Create Account'
             }}
             name="CreateAccount"
             component={CreateAccount}
            />
            <Tab.Screen 
             name="Login"
             component={Login}
            />

        </Tab.Navigator>
    )
}



function Auth() {
    const contextVars = useContext(Context);
    return (
            <Stack.Navigator>
                <>
                {contextVars.isLogin ? (

                    <>

                    <Stack.Screen
                     name="Profile"
                     component={Profile}
                     options={{
                        tabBarVisible: false,
                        headerShown : false,
                     }}
                    />
                    <Stack.Screen
                    name="ReportABug"
                    component={ReportABug}
                    options={{
                        tabBarVisible: false,
                        headerShown : false,
                    }}
                    />
                    <Stack.Screen
                    name="UpgradeToPremium"
                    component={UpgradeToPremium}
                    options = {{
                        headerShown : false,
                        tabBarVisible : false,
                    }}
                    />
                    <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options = {{
                        headerShown : false,
                        tabBarVisible : false,
                    }}
                    />
                    <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options = {{
                        headerShown : false,
                        tabBarVisible : false,
                    }}
                    />
                    <Stack.Screen
                    name="ChangeProfilePhoto"
                    component={ChangeProfilePhoto}
                    options = {{
                        headerShown : false,
                        tabBarVisible : false
                    }}
                    />


                    </>

                ) : (
                    <>
                    <Stack.Screen 
                    name="Login_CreateAccount"
                    component={Login_CreateAccount}
                    options={{
                       tabBarVisible: false,
                       headerShown : false,
                    }}
                   />
   
                   <Stack.Screen 
                    name="ForgetPassword"
                    component={ForgetPassword}
                    options={{
                       tabBarVisible: false,
                       headerShown : false
                    }}
                   />

                   </>
                )}

                </>
            </Stack.Navigator>
    )
}


function AppRoute(props) {

    return (
        <NavigationContainer>
           <Stack.Navigator 
             initialRouteName = {props.isFirstInstallation ? "OnBoarding" : 'Home'}
            >

            <Stack.Screen 
               name="OnBoarding" 
               component={OnBoarding}
               options={{
                   tabBarVisible: false,
                   headerShown : false
                }}
            />
            
            <Stack.Screen 
               name="EnteriesOptions" 
               component={EnteriesOptions}
               options={{
                   tabBarVisible: false,
                   headerShown : false,
               }}
            />

            <Stack.Screen 
               name="Home" 
               component={Home}
               options={{
                   tabBarVisible: false,
                   headerShown : false
               }}
            />

            <Stack.Screen 
               name="Auth" 
               component={Auth}
               options={{
                   tabBarVisible: false,
                   headerShown : false
               }}
            />

           </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppRoute;