import {NavigationProp} from '@react-navigation/native';
import {Text} from 'native-base';
import React, {useContext, useState} from 'react';
import {ScrollView,TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import {contentColor, MainHeader, surfaceColor} from 'src/components';
import Context from 'src/context/context';

import {styles} from './style';

export interface ITermsAndPolicyProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
}

export const TermsAndPolicy = React.memo<ITermsAndPolicyProps>(
  ({navigation}) => {
    const context = useContext(Context);
    const [item1IsCollapse, setItem1IsCollapse] = useState(false);
    const [item2IsCollapse, setItem2IsCollapse] = useState(false);

    const collapse = (item: 0 | 1) => {
      if (item === 0) setItem1IsCollapse(prev => !prev);
      if (item === 1) setItem2IsCollapse(prev => !prev);
    };

    return (
      <View style={{flex: 1}}>
        <MainHeader
          menuOnPress={() => navigation.openDrawer()}
          searchOnPress={() => navigation.navigate('Search')}
        />
        <ScrollView style={{paddingBottom: 100}}>
          <Text
            style={contentColor(context.theme)}
            bold
            textAlign="center"
            fontSize="xl"
            marginTop={5}>
            Terms and Policy
          </Text>
          <Text
            style={contentColor(context.theme)}
            textAlign="center"
            marginRight={10}
            marginLeft={10}
            marginTop={5}>
            By installing the app you have already accepted our Terms and
            Policies
          </Text>

          <TouchableOpacity
            onPress={() => collapse(0)}
            style={[surfaceColor(context.theme), styles.box]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={contentColor(context.theme)} bold>
                Terms of Service
              </Text>
              <Icon
                style={contentColor(context.theme)}
                size={20}
                name="chevron-up"
              />
            </View>
            <Collapsible
              duration={500}
              collapsed={item1IsCollapse}
              enablePointerEvents={true}>
              <Text
                style={contentColor(context.theme)}
                textAlign="justify"
                marginTop={5}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua...
              </Text>
            </Collapsible>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => collapse(1)}
            style={[
              surfaceColor(context.theme),
              styles.box,
              {marginBottom: 100},
            ]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={contentColor(context.theme)} bold>
                Acceptance of terms
              </Text>
              <Icon
                style={contentColor(context.theme)}
                size={20}
                name="chevron-up"
              />
            </View>
            <Collapsible
              duration={500}
              collapsed={item2IsCollapse}
              enablePointerEvents={true}>
              <Text
                style={contentColor(context.theme)}
                textAlign="justify"
                marginTop={5}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua...
              </Text>
            </Collapsible>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  },
);
