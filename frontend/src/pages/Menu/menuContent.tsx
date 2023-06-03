import {Text as NativeText} from 'native-base';
import React, {useContext, useState} from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationProp} from '@react-navigation/native';
import {Text, View, ScrollView, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Context, {Theme} from 'src/context/context';
import {backgroundColor, contentColor} from 'src/components';

import {dark, gray} from 'src/assets';

import {styles} from './styles';

export interface IMenuContentProps extends NavigationProp<any, any> {
  navigation: {closeDrawer: () => void} & NavigationProp<any, any>;
}

export const MenuContent = React.memo((props: IMenuContentProps) => {
  const context = useContext(Context);
  const [toggleIsOn, setToggleIsOn] = useState<boolean>(false);

  const themeSwitcher = async () => {
    context.setTheme(context.theme === 'dark' ? 'light' : 'dark');
    setToggleIsOn(context.theme === 'light' ? false : true);
  };

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
              isOn={toggleIsOn}
              //   isOn={true}
              onColor={gray}
              offColor={dark}
              size="small"
              onToggle={() => themeSwitcher()}
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
            onPress={() => props.navigation.navigate('MyPlayer')}>
            Home
          </Text>
          <Text style={[styles.menuItem, contentColor(context.theme)]}>
            My Playlist
          </Text>
          <Text style={[styles.menuItem, contentColor(context.theme)]}>
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
})
