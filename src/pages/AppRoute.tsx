import {
  Live,
  Login,
  About,
  Search,
  Profile,
  ReportABug,
  OnBoarding,
  EditProfile,
  CreateAccount,
  ResetPassword,
  ForgetPassword,
  TermsAndPolicy,
  EnteriesOptions,
  UpgradeToPremium,
  checkLoginStatus,
  ChangeProfilePhoto,
} from 'src/pages';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Home from './Home/Home';
import React, {ComponentClass, useContext} from 'react';
import Context from 'src/context/context';
import {gray, mainColor} from 'src/assets';
import {changeBackgroundColor} from 'src/components';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {styles} from './style';

export type IAppRouteProps = {
  isFirstInstallation: boolean;
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const BottomTab = createMaterialBottomTabNavigator();

const loginCreateAccount: React.FC = React.memo(() => {
  return (
    <Tab.Navigator
      style={[styles.topTabBar]}
      screenOptions={{
        tabBarPressColor: gray,
        tabBarInactiveTintColor: gray,
        tabBarActiveTintColor: mainColor,
        tabBarStyle: {padding: 5, shadowColor: mainColor, elevation: 0},
        tabBarIndicatorStyle: {backgroundColor: mainColor, elevation: 0},
      }}>
      <Tab.Screen
        //  screenOptions={{
        //     title : 'Create Account'
        //  }}‍‍
        name="CreateAccount"
        component={CreateAccount as unknown as ComponentClass}
      />
      <Tab.Screen name="Login" component={Login as unknown as ComponentClass} />
    </Tab.Navigator>
  );
});

const Auth: React.FC = React.memo(() => {
  const contextVars = useContext(Context);
  checkLoginStatus(contextVars.setIsLogin);
  return (
    <Stack.Navigator>
      <>
        {contextVars.isLogin ? (
          <>
            <Stack.Screen
              name="Profile"
              component={Profile as unknown as ComponentClass}
              options={{headerShown: false /** tabBarVisible: false, */}}
            />
            <Stack.Screen
              name="ReportABug"
              component={ReportABug as unknown as ComponentClass}
              options={{
                /** tabBarVisible: false, */
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="UpgradeToPremium"
              component={UpgradeToPremium as unknown as ComponentClass}
              options={{
                headerShown: false,
                /** tabBarVisible: false, */
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword as unknown as ComponentClass}
              options={{
                headerShown: false,
                /** tabBarVisible: false, */
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile as unknown as ComponentClass}
              options={{
                headerShown: false,
                /** tabBarVisible: false, */
              }}
            />
            <Stack.Screen
              name="ChangeProfilePhoto"
              component={ChangeProfilePhoto as unknown as ComponentClass}
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
              component={ForgetPassword as unknown as ComponentClass}
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

const BottomTabs: React.FC = React.memo(() => {
  const contexts = useContext(Context);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      shifting={true}
      activeColor={mainColor}
      // inactiveColor={(contexts.theme) ? dark : white}
      // barStyle={changeBackgroundColor(contexts.theme)}
      inactiveColor={contexts.theme ? 'black' : 'white'}
      barStyle={changeBackgroundColor(contexts.theme)}>
      <BottomTab.Screen
        name="Home"
        component={Home as unknown as ComponentClass}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-sharp" size={22} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <BottomTab.Screen
        name="Live"
        component={Live as unknown as ComponentClass}
        options={{
          tabBarIcon: ({color}) => <Icon name="wifi" size={22} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Auth}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" size={22} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
});

const DrawerPages: React.FC = React.memo(() => {
  return (
    <Drawer.Navigator
      initialRouteName="MyPlayer"
      screenOptions={{
        headerShown: false,
      }}
      // drawerContent={(props) => <MenuContent {...props} />}
    >
      <Drawer.Screen name="MyPlayer" component={BottomTabs} />

      <Drawer.Screen
        name="About"
        component={About as unknown as ComponentClass}
      />

      <Drawer.Screen
        name="TermsAndPolicy"
        component={TermsAndPolicy as unknown as ComponentClass}
      />

      {/* <Drawer.Screen name="Search" component={Search} /> */}
    </Drawer.Navigator>
  );
});

export const AppRoute: React.FC<IAppRouteProps> = React.memo(
  ({isFirstInstallation}) => {
    const contexts = useContext(Context);

    return (
      <NavigationContainer theme={contexts.theme ? DefaultTheme : DarkTheme}>
        <Stack.Navigator
          initialRouteName={isFirstInstallation ? 'OnBoarding' : 'Home'}>
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding as unknown as ComponentClass}
            options={{
              /** tabBarVisible: false, */
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="EnteriesOptions"
            component={EnteriesOptions as unknown as ComponentClass}
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
              // tabBarVisible: false,
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  },
);
