import {NavigationProp} from '@react-navigation/native';
import {Button,Text, VStack} from 'native-base';
import React, {useCallback, useContext, useState} from 'react';
import {ScrollView,TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import {contentColor, surfaceColor} from 'src/components';
import {MainHeader} from 'src/components';
import Context from 'src/context/context';

import {styles} from './style';

export type IAboutState = {
  item1IsCollapse: boolean;
  item2IsCollapse: boolean;
};

export interface IAboutProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
}

export const About = React.memo<IAboutProps>(({navigation}) => {
  const context = useContext(Context);
  const [item1IsCollapse, setItem1IsCollapse] = useState<boolean>(false);
  const [item2IsCollapse, setItem2IsCollapse] = useState<boolean>(false);

  const collapse = useCallback(
    (item: number) => {
      switch (item) {
        case 0:
          setItem1IsCollapse(!item1IsCollapse);
          break;
        case 1:
          setItem2IsCollapse(!item2IsCollapse);
          break;
      }
    },
    [item1IsCollapse, item2IsCollapse],
  );

  return (
    <View style={{flex: 1}}>
      <MainHeader
        menuOnPress={() => navigation.openDrawer()}
        searchOnPress={() => navigation.navigate('Search')}
      />
      <ScrollView style={{paddingBottom: 100}}>
        <VStack
          flexDirection="row"
          justifyContent="space-between"
          style={[surfaceColor(context.theme), styles.box]}>
          <Text style={contentColor(context.theme)} bold={true}>
            Company name :{' '}
          </Text>
          <Text style={contentColor(context.theme)}>My Player</Text>
        </VStack>
        <VStack
          flexDirection="row"
          justifyContent="space-between"
          style={[surfaceColor(context.theme), styles.box]}>
          <Text style={contentColor(context.theme)} bold={true}>
            Version :{' '}
          </Text>
          <Text style={contentColor(context.theme)}>1.0</Text>
        </VStack>
        <VStack
          justifyContent="space-between"
          style={[surfaceColor(context.theme), styles.box]}>
          <Text style={contentColor(context.theme)} bold={true}>
            Sponsors
          </Text>
          <Text
            style={contentColor(context.theme)}
            marginTop={5}
            textAlign="center">
            London’s Best Lebanese Resturant and Bar
          </Text>
          <Button
            variant="solid"
            size="lg"
            colorScheme="orange"
            style={styles.btn}>
            Visit Site
          </Button>
        </VStack>

        <TouchableOpacity
          onPress={() => collapse(0)}
          style={[surfaceColor(context.theme), styles.box]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={contentColor(context.theme)} bold={true}>
              Why we?
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
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={contentColor(context.theme)} bold={true}>
              Contact US
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
            <VStack flexDirection="row" marginTop={5}>
              <Text style={contentColor(context.theme)} bold={true}>
                Phone Number :{' '}
              </Text>
              <Text style={contentColor(context.theme)}>001-11111111</Text>
            </VStack>
            <VStack flexDirection="row">
              <Text style={contentColor(context.theme)} bold={true}>
                Email :{' '}
              </Text>
              <Text style={contentColor(context.theme)}>
                myplayer@gmail.com
              </Text>
            </VStack>
            <VStack flexDirection="row">
              <Text style={contentColor(context.theme)} bold={true}>
                Website :{' '}
              </Text>
              <Text style={contentColor(context.theme)}>www.myplayer.com</Text>
            </VStack>
            {/* <VStack flexDirection="row" marginTop={5}>
                          <VStack>
                            <Text style={contentColor(context.theme)} bold={true}>Phone Number : </Text>
                            <Text style={contentColor(context.theme)} bold={true}>Email : </Text>
                            <Text style={contentColor(context.theme)} bold={true}>Website : </Text>
                          </VStack>
                          <VStack marginLeft={10}>
                            <Text style={contentColor(context.theme)}>001-11111111</Text>
                            <Text style={contentColor(context.theme)}>myplayer@gmail.com</Text>
                            <Text style={contentColor(context.theme)}>www.myplayer.com</Text>
                          </VStack>
                        </VStack> */}
          </Collapsible>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
});
