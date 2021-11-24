import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Text, View, ScrollView , Image} from 'react-native';
import React , { useContext, useState } from "react";
import { styles } from './styles';
import ToggleSwitch from 'toggle-switch-react-native';
import { gray, dark } from '../../assets/constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import context from '../../context/context';
import { changeColor, changeBackgroundColor } from '../../components/lightDarkTheme';

export function MenuContent(props) {

    const contexts = useContext(context);
    const [toggleIsOn , setToggleIsOn] = useState(contexts.theme);

    themeSwitcher = () => {
        contexts.setTheme();
        setToggleIsOn(contexts.theme)
    }

    return (
      <DrawerContentScrollView {...props} style={changeBackgroundColor(contexts.theme)}>
        {/* <DrawerItemList {...props} /> */}

        <ScrollView style={[styles.menuContent]}>
            <Icon onPress={() => props.navigation.closeDrawer()} style={[styles.backBtn , changeColor(contexts.theme)]} name="return-down-back-outline" />
            <View style={styles.logoSection}>
                <Image style={styles.logo} source={require('../../assets/Images/Windows-11.jpeg')} />
                <Text style={[styles.title , changeColor(contexts.theme)]}>MyPlayer</Text>
                <Text style={styles.subTitle}>Here can be a slogan sentence</Text>
                <View style={styles.switcherContent}>
                    <Icon style={[styles.switcherText , changeColor(contexts.theme)]} name="sunny-outline" size={25} />
                    <ToggleSwitch
                      isOn={toggleIsOn}
                      onColor={gray}
                      offColor={dark}
                      size="small"
                      onToggle={() => this.themeSwitcher()}
                    />
                    <Icon style={[styles.switcherText , changeColor(contexts.theme)]} name="moon-outline" size={20} />
                </View>
            </View>
            <View style={styles.lines}>
                <Text style={styles.line}></Text>
                <Text style={styles.line}></Text>
            </View>
            <View style={styles.section}>
                <Text 
                 style={[styles.menuItem , changeColor(contexts.theme)]}
                 onPress={() => props.navigation.navigate('MyPlayer')}
                 >Home</Text>
                <Text style={[styles.menuItem , changeColor(contexts.theme)]}>My Playlist</Text>
                <Text style={[styles.menuItem , changeColor(contexts.theme)]}>My Saves</Text>
            </View>
            <View style={styles.lines}>
                <Text style={styles.line}></Text>
                <Text style={styles.line}></Text>
            </View>
            <View style={styles.section}>
                <Text
                  onPress={() => props.navigation.navigate('About')} 
                  style={[styles.menuItem , changeColor(contexts.theme)]}
                  >About US</Text>
                <Text
                  onPress={() => props.navigation.navigate('TermsAndPolicy')} 
                  style={[styles.menuItem , changeColor(contexts.theme)]}
                  >Terms and Policy</Text>
            </View>
            <View style={styles.lines}>
                <Text style={styles.line}></Text>
                <Text style={styles.line}></Text>
            </View>
            <View style={styles.section}>
                <Text style={[styles.menuItem , changeColor(contexts.theme)]}>Help?</Text>
            </View>
        </ScrollView>
  
      </DrawerContentScrollView>
    );
  }