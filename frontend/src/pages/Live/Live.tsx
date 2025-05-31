import React, {useState, useCallback} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {Text, VStack} from 'native-base';
import {MainHeader} from 'src/components';
// import {Tabs} from './Tabs';

interface ILiveProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
}

export const Live = React.memo(({navigation}: ILiveProps) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  // Optional animation logic placeholder
  // const [animation, setAnimation] = useState<any>();
  // const triggerAnimation = useCallback(() => {
  //   setAnimation(ZoomInRotate);
  // }, []);

  return (
    <>
      <MainHeader
        isLive={true}
        searchOnPress={() => navigation.navigate('Search')}
        menuOnPress={() => navigation.openDrawer()}
      />
      <VStack flex={1} alignItems="center" justifyContent="center">
        <Text color="gray.400" fontSize="2xl">
          Coming Soon
        </Text>
      </VStack>

      {/* Future content */}
      {/* <Animated.Text entering={animation}>my text</Animated.Text> */}
      {/* <NativeText bold={true} textAlign="center" fontSize={20}>Live</NativeText> */}
      {/* <Tabs /> */}
    </>
  );
});
