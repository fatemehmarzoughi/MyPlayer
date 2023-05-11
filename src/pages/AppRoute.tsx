import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

import React, { useContext } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import Home from "~/pages/Home/Home";
import Live from "~/pages/Live/Live";
import Context from "~/context/context";
import About from "~/pages/About/About";
import Search from "~/pages/Search/Search";
import Profile from "~/pages/Auth/Profile/Profile";
import OnBoarding from "~/pages/onBoarding/onBoarding";
import Login from "~/pages/Auth/CreateAccount_Login/Login";
import { mainColor, gray } from "~/assets/constants/Colors";
import ReportABug from "~/pages/Auth/Report-a-Bug/ReportABug";
import EditProfile from "~/pages/Auth/EditProfile/EditProfile";
import { styles } from "~/pages/Auth/CreateAccount_Login/style";
import { checkLoginStatus } from "~/pages/Auth/checkLoginStatus";
import TermsAndPolicy from "~/pages/TermsAndPolicy/TermsAndPolicy";
import { changeBackgroundColor } from "~/components/lightDarkTheme";
import ResetPassword from "~/pages/Auth/ResetPassword/ResetPassword";
import EnteriesOptions from "~/pages/EnteriesOptions/EnteriesOptions";
import ForgetPassword from "~/pages/Auth/ForgetPassword/ForgetPassword";
import CreateAccount from "~/pages/Auth/CreateAccount_Login/CraeteAccount";
import UpgradeToPremium from "~/pages/Auth/UpgradeToPremium/UpgradeToPremium";
import ChangeProfilePhoto from "~/pages/Auth/ChangeProfilePhoto/ChangeProfilePhoto";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createMaterialBottomTabNavigator();

const loginCreateAccount = React.memo(function loginCreateAccount() {
  return (
    <Tab.Navigator
      style={[styles.topTabBar]}
      screenOptions={{
        tabBarPressColor: gray,
        tabBarInactiveTintColor: gray,
        tabBarActiveTintColor: mainColor,
        tabBarStyle: { padding: 5, shadowColor: mainColor, elevation: 0 },
        tabBarIndicatorStyle: { backgroundColor: mainColor, elevation: 0 },
      }}
    >
      <Tab.Screen
        //  screenOptions={{
        //     title : 'Create Account'
        //  }}‍‍
        name="CreateAccount"
        component={CreateAccount}
      />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
});

const Auth = React.memo(function Auth() {
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
              options={{ headerShown: false /** tabBarVisible: false, */ }}
            />
            <Stack.Screen
              name="ReportABug"
              component={ReportABug}
              options={{
                /** tabBarVisible: false, */
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="UpgradeToPremium"
              component={UpgradeToPremium}
              options={{
                headerShown: false,
                /** tabBarVisible: false, */
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                headerShown: false,
                /** tabBarVisible: false, */
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                headerShown: false,
                /** tabBarVisible: false, */
              }}
            />
            <Stack.Screen
              name="ChangeProfilePhoto"
              component={ChangeProfilePhoto}
              options={{
                headerShown: false,
                /** tabBarVisible: false, */
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login_CreateAccount"
              component={loginCreateAccount}
              options={{
                /** tabBarVisible: false, */
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPassword}
              options={{
                /** tabBarVisible: false, */
                headerShown: false,
              }}
            />
          </>
        )}
      </>
    </Stack.Navigator>
  );
});

const BottomTabs = React.memo(function BottomTabs() {
  const contexts = useContext(Context);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor={mainColor}
      // inactiveColor={(contexts.theme) ? dark : white}
      // barStyle={changeBackgroundColor(contexts.theme)}
      inactiveColor={contexts.theme ? "black" : "white"}
      barStyle={changeBackgroundColor(contexts.theme)}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-sharp" size={22} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <BottomTab.Screen
        name="Live"
        component={Live}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="wifi" size={22} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Auth}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={22} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
});

const DrawerPages = React.memo(function DrawerPages() {
  return (
    <Drawer.Navigator
      initialRouteName="MyPlayer"
      screenOptions={{
        headerShown: false,
      }}
      // drawerContent={(props) => <MenuContent {...props} />}
    >
      <Drawer.Screen name="MyPlayer" component={BottomTabs} />

      <Drawer.Screen name="About" component={About} />

      <Drawer.Screen name="TermsAndPolicy" component={TermsAndPolicy} />

      {/* <Drawer.Screen
             name="Search"
             component={Search}
            /> */}
    </Drawer.Navigator>
  );
});

export const AppRoute = (props: { isFirstInstallation: boolean }) => {
  const contexts = useContext(Context);

  return (
    <NavigationContainer theme={contexts.theme ? DefaultTheme : DarkTheme}>
      <Stack.Navigator
        initialRouteName={props.isFirstInstallation ? "OnBoarding" : "Home"}
      >
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{
            /** tabBarVisible: false, */
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="EnteriesOptions"
          component={EnteriesOptions}
          options={{
            /** tabBarVisible: false, */
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            /** tabBarVisible: true, */
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="Home"
          component={DrawerPages}
          //    component={Home}
          options={{
            /** tabBarVisible: false, */
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Auth"
          component={loginCreateAccount}
          options={{
            /** tabBarVisible: false, */
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
