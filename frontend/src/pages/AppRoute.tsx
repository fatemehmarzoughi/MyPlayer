import {
  Live,
  Auth,
  About,
  Search,
  OnBoarding,
  TermsAndPolicy,
  EnteriesOptions,
  LoginCreateAccount,
} from 'src/pages';
import Home from './Home/Home';
import {mainColor} from 'src/assets';
import React, {useContext} from 'react';
import Context from 'src/context/context';
import {changeBackgroundColor} from 'src/components';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

export type IAppRouteProps = {
  isFirstInstallation: boolean;
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createMaterialBottomTabNavigator();

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
        component={props => <Home {...props} />}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home-sharp" size={22} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <BottomTab.Screen
        name="Live"
        component={props => <Live {...props} />}
        options={{
          tabBarIcon: ({color}) => <Icon name="wifi" size={22} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={props => <Auth Stack {...props} />}
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
      <Drawer.Screen
        name="MyPlayer"
        component={props => <BottomTabs {...props} />}
      />

      <Drawer.Screen name="About" component={props => <About {...props} />} />

      <Drawer.Screen
        name="TermsAndPolicy"
        component={props => <TermsAndPolicy {...props} />}
      />

      {/* <Drawer.Screen name="Search" component={Search} /> */}
    </Drawer.Navigator>
  );
});

export const AppRoute: React.FC<IAppRouteProps> = React.memo(
  ({isFirstInstallation}) => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isFirstInstallation ? 'OnBoarding' : 'Home'}>
          <Stack.Screen
            name="OnBoarding"
            component={props => <OnBoarding {...props} />}
            options={{
              /** tabBarVisible: false, */
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="EnteriesOptions"
            component={props => <EnteriesOptions {...props} />}
            options={{
              /** tabBarVisible: false, */
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Search"
            component={props => <Search {...props} />}
            options={{
              /** tabBarVisible: true, */
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="Home"
            component={props => <DrawerPages {...props} />}
            //    component={Home}
            options={{
              /** tabBarVisible: false, */
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Auth"
            component={props => <LoginCreateAccount {...props} />}
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
