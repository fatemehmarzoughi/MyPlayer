import {Text as NativeText} from 'native-base';
import React, {useContext, useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {Text, View, ScrollView, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Context from 'src/context/context';
import {changeBackgroundColor, changeColor} from 'src/components';

import {dark, gray} from 'src/assets';

import {styles} from './styles';

export interface IMenuContentProps extends NavigationProp<any, any> {
  navigation: {closeDrawer: () => void} & NavigationProp<any, any>;
}

export function MenuContent(props: IMenuContentProps) {
  const context = useContext(Context);
  const [toggleIsOn, setToggleIsOn] = useState(false);

  const themeSwitcher = async () => {
    context.setTheme(!context.theme);
    setToggleIsOn(context.theme);
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={changeBackgroundColor(context.theme)}>
      {/* <DrawerItemList {...props} /> */}

      <ScrollView /** style={[styles.menuContent]}*/>
        <Icon
          onPress={() => props.navigation.closeDrawer()}
          style={[styles.backBtn, changeColor(context.theme)]}
          name="return-down-back-outline"
        />
        <View style={styles.logoSection}>
          <Image
            style={styles.logo}
            source={require('../../assets/Images/Windows-11.jpeg')}
          />
          <Text style={[styles.title, changeColor(context.theme)]}>
            MyPlayer
          </Text>
          <NativeText style={styles.subTitle} textAlign="center">
            Here can be a slogan sentence
          </NativeText>
          <View style={styles.switcherContent}>
            <Icon
              style={[styles.switcherText, changeColor(context.theme)]}
              name="sunny-outline"
              size={25}
            />
            <ToggleSwitch
              isOn={toggleIsOn}
              //   isOn={true}
              onColor={gray}
              offColor={dark}
              size="small"
              onToggle={() => themeSwitcher()}
            />
            <Icon
              style={[styles.switcherText, changeColor(context.theme)]}
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
            style={[styles.menuItem, changeColor(context.theme)]}
            onPress={() => props.navigation.navigate('MyPlayer')}>
            Home
          </Text>
          <Text style={[styles.menuItem, changeColor(context.theme)]}>
            My Playlist
          </Text>
          <Text style={[styles.menuItem, changeColor(context.theme)]}>
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
            style={[styles.menuItem, changeColor(context.theme)]}>
            About US
          </Text>
          <Text
            onPress={() => props.navigation.navigate('TermsAndPolicy')}
            style={[styles.menuItem, changeColor(context.theme)]}>
            Terms and Policy
          </Text>
        </View>
        <View style={styles.lines}>
          <Text style={styles.line}></Text>
          <Text style={styles.line}></Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.menuItem, changeColor(context.theme)]}>
            Help?
          </Text>
        </View>
      </ScrollView>
    </DrawerContentScrollView>
  );
}
