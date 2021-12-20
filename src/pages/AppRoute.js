import 'react-native-gesture-handler';
import React , { useContext } from "react";
import Context from 'context/context';
import EnteriesOptions from "./EnteriesOptions/EnteriesOptions";
import OnBoarding from "./onBoarding/onBoarding";
import { NavigationContainer, useRoute, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home/Home';
import Live from './Live/Live'
import Profile from './Auth/Profile/Profile';
import Login from './Auth/CreateAccount_Login/Login'
import ReportABug from './Auth/Report-a-Bug/ReportABug'
import CreateAccount from './Auth/CreateAccount_Login/CraeteAccount'
import ResetPassword from './Auth/ResetPassword/ResetPassword';
import ForgetPassword from './Auth/ForgetPassword/ForgetPassword';
import EditProfile from 'pages/Auth/EditProfile/EditProfile'
import ChangeProfilePhoto from './Auth/ChangeProfilePhoto/ChangeProfilePhoto'
import { styles } from './Auth/CreateAccount_Login/style';
import { dark, mainColor, white, gray } from 'assets/constants/Colors';
import UpgradeToPremium from './Auth/UpgradeToPremium/UpgradeToPremium';
import { MenuContent } from './Menu/menuContent';
import Icon from 'react-native-vector-icons/Ionicons';
import { changeBackgroundColor } from 'components/lightDarkTheme';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import About from './About/About';
import TermsAndPolicy from './TermsAndPolicy/TermsAndPolicy'
import Search from './Search/Search';
import { checkLoginStatus } from 'pages/Auth/checkLoginStatus'

const BottomTab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();


function Login_CreateAccount(){
    const contextVars = useContext(Context);
    return (
        <Tab.Navigator style={[styles.topTabBar]}
         screenOptions={{
            tabBarActiveTintColor : mainColor,
            tabBarInactiveTintColor : gray,
            tabBarPressColor : gray,
            tabBarStyle: { padding : 5, shadowColor : mainColor, elevation:0},
            tabBarIndicatorStyle : { backgroundColor : mainColor, elevation:0},
         }}
        >
            <Tab.Screen 
            //  screenOptions={{
            //     title : 'Create Account'
            //  }}‍‍
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

function Auth(){
    const contextVars = useContext(Context);
    checkLoginStatus(contextVars.setIsLogin);
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

                ) 
                : 
                (
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

function BottomTabs() {

    const contexts = useContext(Context)
    return(
    <BottomTab.Navigator 
        initialRouteName="Home" 
        shifting={true}
        activeColor={mainColor}
        inactiveColor={(contexts.theme) ? dark : white}
        barStyle={changeBackgroundColor(contexts.theme)}

    >
        <BottomTab.Screen
         name="Home"
         component={Home}  
         options={{ 
             tabBarIcon : ({ color , size }) => (
               <Icon name="home-sharp" size={22} color={color} />
            ),
            tabBarLabel : 'Home'
        }}
        />
        <BottomTab.Screen 
         name="Live" 
         component={Live} 
         options = {{
             tabBarIcon : ({ color, size }) => (
                 <Icon name="wifi" size={22} color={color} />
             ),
         }}
        />
        <BottomTab.Screen 
         name="Profile" 
         component={Auth} 
         options = {{
             tabBarIcon : ({ color , size }) => (
                 <Icon name="person" size={22} color={color} />
             ),
         }}
        />

    </BottomTab.Navigator>
    )
}

function DrawerPages() {
    return(
        <Drawer.Navigator 
          initialRouteName="MyPlayer" 
          screenOptions={{
            headerShown : false
          }}
          drawerContent={(props) => <MenuContent {...props} /> }
        >
            <Drawer.Screen 
             name="MyPlayer"
             component={BottomTabs}
            />

           <Drawer.Screen 
             name="About"
             component={About}
            />

            <Drawer.Screen 
             name="TermsAndPolicy"
             component={TermsAndPolicy}
            />

            {/* <Drawer.Screen 
             name="Search"
             component={Search}
            /> */}

        </Drawer.Navigator>
    )
}


function AppRoute(props) {
    const contexts = useContext(Context)

    return (
        <NavigationContainer theme={ contexts.theme ? DefaultTheme : DarkTheme}>
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
               name="Search" 
               component={Search}
               options={{
                   tabBarVisible: true,
                   headerShown : true,
               }}
            />

            <Stack.Screen 
               name="Home" 
               component={DrawerPages}
            //    component={Home}
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