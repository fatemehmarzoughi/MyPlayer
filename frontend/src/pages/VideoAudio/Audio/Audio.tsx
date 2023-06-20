import {
  RouteProp,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';

export type IAudioProps = {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
  route: RouteProp<ParamListBase, 'Audio'>;
};

export type IAudioStates = {};

export class Audio extends React.PureComponent<IAudioProps, IAudioStates> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  override componentDidMount(): void {
    console.log('this.props.route.params = ');
    console.log(this.props.route.params);
  }

  override render(): React.ReactNode {
    return <Text>Audio</Text>;
  }
}
