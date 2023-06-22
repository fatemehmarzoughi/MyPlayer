import {
  RouteProp,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import React from 'react';
import {RefreshControl, ScrollView, Text} from 'react-native';
import {ConnectedProps, connect} from 'react-redux';
import {getItemDetails} from 'src/Redux/actions';
import {ItemDetailsActions} from 'src/Redux/reducers';
import {NetworkError} from 'src/pages/Errors';
import {Header, PageWrapper} from 'src/components';
import {ItemType} from 'src/API';
import {Audio, Video} from 'src/pages';
import LottieView from 'lottie-react-native';

type Props = {
  id: number;
};

export type IAudioVideoRootMapState = {
  itemDetails: ItemDetailsActions;
};

export interface IAudioVideoRootProps extends IAudioVideoRootDispatchProps {
  navigation: {openDrawer: () => void} & NavigationProp<any, any>;
  route: RouteProp<ParamListBase, 'AVRoot'>;
}
export type IAudioVideoRootStates = {
  refreshing: boolean;
};

class AudioVideoRoot extends React.PureComponent<
  IAudioVideoRootProps,
  IAudioVideoRootStates
> {
  private _isMounted = true;
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  override async componentDidMount() {
    this._isMounted = false;
    const {id} = this.props.route.params as Props;
    await this.props.getItemDetails({id});
  }

  override componentWillUnmount(): void {
    this._isMounted = false;
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      async () => {
        const {id} = this.props.route.params as Props;
        await this.props.getItemDetails({id});
        this.setState({refreshing: false});
      },
    );
  };

  _render_content = () => {
    if (!this.props.itemDetails.itemDetails) return <>Error loading data</>;
    const {title, cover, type} =
      this.props.itemDetails.itemDetails.data.attributes;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }>
        <PageWrapper>
          {/* /* --------------------------------- Header --------------------------------- */}
          <Header
            title={title}
            customClick={() => this.props.navigation.goBack()}
          />
          {/* /* ------------------------------- Player ------------------------------ */}
          {type === ItemType.Audio ? <Audio /> : <Video />}

          {/* /* ---------------------------------- Tools --------------------------------- */}

          {/* /* ------------------------------ Related Items ----------------------------- */}
        </PageWrapper>
      </ScrollView>
    );
  };

  override render(): React.ReactNode {
    const {loadingItemDetail, error} = this.props.itemDetails;

    switch (true) {
      case loadingItemDetail || this._isMounted:
        return (
          <LottieView
            loop={true}
            autoPlay={true}
            style={{
              width: 300,
              alignSelf: 'center',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
            source={require('../../../assets/Images/loading2.json')}
          />
        );
      case !!error:
        return <NetworkError onReload={() => console.log('reload')} />;

      default:
        return this._render_content();
    }
  }
}

const mapStateToProps = (state: IAudioVideoRootMapState) => {
  return {
    itemDetails: state.itemDetails,
  };
};

const dispatchToProps = {
  getItemDetails,
};

const connector = connect(mapStateToProps, dispatchToProps);

export type IAudioVideoRootDispatchProps = ConnectedProps<typeof connector>;

export default connector(AudioVideoRoot);
