import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {NavigationProp} from '@react-navigation/native';
import {Text as NativeText} from 'native-base';
import React, {useContext, useState} from 'react';
import {Image,ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {dark, gray} from 'src/assets';
import {backgroundColor, contentColor} from 'src/components';
import Context, {Theme} from 'src/context/context';
import ToggleSwitch from 'toggle-switch-react-native';

import {styles} from './styles';

export interface IMenuContentProps {
  navigation: {closeDrawer: () => void} & NavigationProp<any, any>;
}

export const MenuContent: React.FC<any> = React.memo(props => {
  const context = useContext(Context);

  return (
    <DrawerContentScrollView {...props} style={backgroundColor(context.theme)}>
      {/* <DrawerItemList {...props} /> */}

      <ScrollView /** style={[styles.menuContent]}*/>
        <Icon
          onPress={() => props.navigation.closeDrawer()}
          style={[styles.backBtn, contentColor(context.theme)]}
          name="return-down-back-outline"
        />
        <View style={styles.logoSection}>
          <Image
            style={styles.logo}
            source={require('../../assets/Images/Windows-11.jpeg')}
          />
          <Text style={[styles.title, contentColor(context.theme)]}>
            MyPlayer
          </Text>
          <NativeText style={styles.subTitle} textAlign="center">
            Here can be a slogan sentence
          </NativeText>
          <View style={styles.switcherContent}>
            <Icon
              style={[styles.switcherText, contentColor(context.theme)]}
              name="sunny-outline"
              size={25}
            />
            <ToggleSwitch
              isOn={context.theme === 'dark'}
              //   isOn={true}
              onColor={gray}
              offColor={dark}
              size="small"
              onToggle={isOn => context.setTheme(isOn ? 'dark' : 'light')}
            />
            <Icon
              style={[styles.switcherText, contentColor(context.theme)]}
              name="moon-outline"
              size={20}
            />
          </View>
        </View>
        <View style={styles.lines}>
          <Text style={styles.line}></Text>
          <Text style={styles.line}></Text>
        </View>
        <View style={styles.section}>
          <Text
            style={[styles.menuItem, contentColor(context.theme)]}
            onPress={() => props.navigation.navigate('BottomTabs')}>
            Home
          </Text>
          <Text style={[styles.menuItem, contentColor(context.theme)]}>
            My Playlist (Coming Soon)
          </Text>
          <Text
            onPress={() => props.navigation.navigate('MySaves')}
            style={[styles.menuItem, contentColor(context.theme)]}>
            My Saves
          </Text>
        </View>
        <View style={styles.lines}>
          <Text style={styles.line}></Text>
          <Text style={styles.line}></Text>
        </View>
        <View style={styles.section}>
          <Text
            onPress={() => props.navigation.navigate('About')}
            style={[styles.menuItem, contentColor(context.theme)]}>
            About US
          </Text>
          <Text
            onPress={() => props.navigation.navigate('TermsAndPolicy')}
            style={[styles.menuItem, contentColor(context.theme)]}>
            Terms and Policy
          </Text>
        </View>
        <View style={styles.lines}>
          <Text style={styles.line}></Text>
          <Text style={styles.line}></Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.menuItem, contentColor(context.theme)]}>
            Help?
          </Text>
        </View>
      </ScrollView>
    </DrawerContentScrollView>
  );
});
