import {NavigationProp} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {styles} from './styles';

interface EntriesOptionsProps {
  navigation: NavigationProp<any, any>;
}

export const EntriesOptions = React.memo<EntriesOptionsProps>(
  ({navigation}) => {

    return (
      <View style={styles.container}>
        <LottieView
          loop
          autoPlay
          style={styles.imageStyle}
          source={require('../../assets/Images/account.json')}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.mainBtn}
            onPress={() => navigation.navigate('AppRoute')}>
            <Text style={styles.BtnText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minorBtn}
            onPress={() => navigation.navigate('AppRoute')}>
            <Text style={styles.BtnText}>Join the App</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);
