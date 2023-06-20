import {
  RouteProp,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';

export type IVideoProps = {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
  route: RouteProp<ParamListBase, 'Video'>;
};
export type IVideoStates = {};

export class Video extends React.PureComponent<IVideoProps, IVideoStates> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  override componentDidMount(): void {
    console.log('this.props.route.params = ');
    console.log(this.props.route.params);
  }

  override render(): React.ReactNode {
    return <Text>Video</Text>;
  }
}
