import React from 'react';
import {Theme} from 'src/context';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import Animated, {BounceIn} from 'react-native-reanimated';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {backgroundColor, surfaceColor} from 'src/components/lightDarkTheme';
import Context from 'src/context/context';
import {styles} from './style';
import {Spinner} from 'native-base';

export type IFlatList1Props = {
  loading?: boolean;
  title: string;
  theme: Theme;
  data: {imageURL: string}[];
  func: (imgUrl: string) => void;
};

export type IFlatList1State = {
  loadingData: {
    id: number;
  }[];
};

export class FlatList1 extends React.PureComponent<
  IFlatList1Props,
  IFlatList1State
> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  constructor(props: IFlatList1Props) {
    super(props);
    this.state = {
      loadingData: [
        {
          id: 0,
        },
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    };
  }

  override render() {
    return (
      <>
        {this.props.loading ? (
          <View style={styles.row}>
            <Text style={styles.title}>{this.props.title}</Text>
            <FlatList
              horizontal
              data={this.state.loadingData}
              style={styles.flatlist}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[styles.Image, surfaceColor(this.context.theme)]}>
                  <Spinner
                    size={'lg'}
                    accessibilityLabel="Loading posts"
                    color="warning.500"
                    style={{
                      alignSelf: 'center',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View style={styles.row}>
            <Text style={styles.title}>{this.props.title}</Text>
            <FlatList
              horizontal
              data={this.props.data}
              style={styles.flatlist}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => this.props.func(item.imageURL)}>
                  <Animated.View entering={BounceIn.duration(500).delay(300)}>
                    {/* <Image style={[styles.Image , backgroundColor()]} source={{uri : item.imageURL}} /> */}
                    <FastImage
                      style={[
                        styles.Image,
                        backgroundColor(this.context.theme),
                      ]}
                      source={{
                        uri: item.imageURL,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </Animated.View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </>
    );
  }
}
