import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {MainHeader} from 'src/components';
import {Tabs} from './Tabs';
import {Text, VStack} from 'native-base';

export interface ILiveProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
}

export interface ILiveStates {
  index: number;
  routes: [{key: 'first'; title: 'First'}, {key: 'second'; title: 'Second'}];
}
export class Live extends React.PureComponent<ILiveProps, ILiveStates> {
  constructor(props: ILiveProps) {
    super(props);
    this.state = {
      // animation : '',
      index: 0,
      routes: [
        {key: 'first', title: 'First'},
        {key: 'second', title: 'Second'},
      ],
    };
  }
  // animation = () => {
  //     console.log('pressed ' + this.state.animation)
  //     this.setState({
  //         animation : ZoomInRotate
  //     })
  // }

  override render() {
    return (
      <>
        <MainHeader
          isLive={true}
          searchOnPress={() => this.props.navigation.navigate('Search')}
          menuOnPress={() => this.props.navigation.openDrawer()}
        />
        <VStack flex={1} alignItems={'center'} justifyContent={'center'}>
          <Text color={'gray.400'} fontSize={'2xl'}>
            Coming Soon
          </Text>
        </VStack>
        {/* <Animated.Text entering={this.state.animation}>my text</Animated.Text> */}
        {/* <NativeText bold={true} textAlign="center" fontSize={20}>Live</NativeText> */}
        {/* <Tabs /> */}
      </>
    );
  }
}
