import { Text as NativeText } from "native-base";
import React, { useContext, useState } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Text, View, ScrollView, Image } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

import {
  changeColor,
  changeBackgroundColor,
} from "~/components/lightDarkTheme";
import context from "~/context/context";
import * as Colors from "~/assets/constants/Colors";

import { styles } from "./styles";
import { NavigationScreenProp } from "react-navigation";
export interface IMenuContentProps extends NavigationScreenProp<any, any> {
  navigation: { closeDrawer: () => void } & NavigationScreenProp<any, any>;
}

export function MenuContent(props: IMenuContentProps) {
  const contexts = useContext(context);
  const [toggleIsOn, setToggleIsOn] = useState(false);

  const themeSwitcher = async () => {
    contexts.setTheme(!contexts.theme);
    setToggleIsOn(contexts.theme);
  };
  
  return (
    <DrawerContentScrollView
      {...props}
      style={changeBackgroundColor(contexts.theme)}
    >
      {/* <DrawerItemList {...props} /> */}

      <ScrollView /** style={[styles.menuContent]}*/>
        <Icon
          onPress={() => props.navigation.closeDrawer()}
          style={[styles.backBtn, changeColor(contexts.theme)]}
          name="return-down-back-outline"
        />
        <View style={styles.logoSection}>
          <Image
            style={styles.logo}
            source={require("../../assets/Images/Windows-11.jpeg")}
          />
          <Text style={[styles.title, changeColor(contexts.theme)]}>
            MyPlayer
          </Text>
          <NativeText style={styles.subTitle} textAlign="center">
            Here can be a slogan sentence
          </NativeText>
          <View style={styles.switcherContent}>
            <Icon
              style={[styles.switcherText, changeColor(contexts.theme)]}
              name="sunny-outline"
              size={25}
            />
            <ToggleSwitch
              isOn={toggleIsOn}
              //   isOn={true}
              onColor={Colors.gray}
              offColor={Colors.dark}
              size="small"
              onToggle={() => themeSwitcher()}
            />
            <Icon
              style={[styles.switcherText, changeColor(contexts.theme)]}
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
            style={[styles.menuItem, changeColor(contexts.theme)]}
            onPress={() => props.navigation.navigate("MyPlayer")}
          >
            Home
          </Text>
          <Text style={[styles.menuItem, changeColor(contexts.theme)]}>
            My Playlist
          </Text>
          <Text style={[styles.menuItem, changeColor(contexts.theme)]}>
            My Saves
          </Text>
        </View>
        <View style={styles.lines}>
          <Text style={styles.line}></Text>
          <Text style={styles.line}></Text>
        </View>
        <View style={styles.section}>
          <Text
            onPress={() => props.navigation.navigate("About")}
            style={[styles.menuItem, changeColor(contexts.theme)]}
          >
            About US
          </Text>
          <Text
            onPress={() => props.navigation.navigate("TermsAndPolicy")}
            style={[styles.menuItem, changeColor(contexts.theme)]}
          >
            Terms and Policy
          </Text>
        </View>
        <View style={styles.lines}>
          <Text style={styles.line}></Text>
          <Text style={styles.line}></Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.menuItem, changeColor(contexts.theme)]}>
            Help?
          </Text>
        </View>
      </ScrollView>
    </DrawerContentScrollView>
  );
}
