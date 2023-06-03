import {
  Login,
  Search,
  OnBoarding,
  EntriesOptions,
  ForgetPassword,
  CreateAccount,
} from 'src/pages';
import React from 'react';
import Home from './Home/Home';
import {gray, mainColor} from 'src/assets';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MD3DarkTheme, Provider as PaperProvider} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {styles} from './style';

export type IAppRouteProps = {
  isFirstInstallation: boolean;
};

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const LoginCreateAccount = React.memo(() => (
  <Tab.Navigator
    style={[styles.topTabBar]}
    screenOptions={{
      tabBarPressColor: gray,
      tabBarInactiveTintColor: gray,
      tabBarActiveTintColor: mainColor,
      tabBarStyle: {padding: 5, shadowColor: mainColor, elevation: 0},
      tabBarIndicatorStyle: {backgroundColor: mainColor, elevation: 0},
    }}>
    <Tab.Screen name="CreateAccount">
      {props => <CreateAccount {...props} />}
    </Tab.Screen>
    <Tab.Screen name="Login">{props => <Login {...props} />}</Tab.Screen>
  </Tab.Navigator>
));

const Auth = React.memo(() => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login_CreateAccount"
      component={LoginCreateAccount}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="ForgetPassword"
      options={{
        headerShown: false,
      }}>
      {props => <ForgetPassword {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
));

export const AppRoute: React.FC<IAppRouteProps> = React.memo(
  ({isFirstInstallation}) => {
    return (
      <PaperProvider theme={MD3DarkTheme}>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator
            initialRouteName={isFirstInstallation ? 'onBoarding' : 'Home'}>
            <Stack.Screen
              name="Home"
              options={{
                headerShown: false,
              }}>
              {props => <Home {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Search">
              {props => <Search {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="onBoarding"
              options={{
                headerShown: false,
              }}>
              {props => <OnBoarding {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="EntriesOptions"
              options={{
                headerShown: false,
              }}>
              {props => <EntriesOptions {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  },
);
