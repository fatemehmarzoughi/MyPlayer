import React from 'react';
import {Text} from 'react-native';
import {ItemDetailsActions} from 'src/Redux/reducers';

export type IVideoMapState = {
  itemDetails: ItemDetailsActions;
};

export interface IVideoProps {

}
export type IVideoStates = {
  refreshing: boolean;
};

export class Video extends React.PureComponent<IVideoProps, IVideoStates> {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  override async componentDidMount() {}

  override render(): React.ReactNode {
    return <Text>Video</Text>;
  }
}
