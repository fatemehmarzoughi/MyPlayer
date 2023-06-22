import React from 'react';
import {Text} from 'react-native';
import {ItemDetailsActions} from 'src/Redux/reducers';

export type IAudioMapState = {
  itemDetails: ItemDetailsActions;
};

export interface IAudioProps {

}
export type IAudioStates = {
  refreshing: boolean;
};

export class Audio extends React.PureComponent<IAudioProps, IAudioStates> {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  override async componentDidMount() {}

  override render(): React.ReactNode {
    return <Text>Audio</Text>;
  }
}
