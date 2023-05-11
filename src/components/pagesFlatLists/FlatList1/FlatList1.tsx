import React from "react";
import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image";
import Animated, { BounceIn } from "react-native-reanimated";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

import { changeBackgroundColor } from "~/components/lightDarkTheme";

import { styles } from "./style";

export type IFlatList1Props = {
  loading?: boolean;
  title: string;
  theme: boolean;
  data: { imageURL: string }[];
  func: (imgUrl: string) => void;
};

export type IFlatList1State = {
  loadingData: {
    id: number;
  }[];
};

export default class FlatList1 extends React.Component<
  IFlatList1Props,
  IFlatList1State
> {
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
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.Image,
                    changeBackgroundColor(this.props.theme),
                  ]}
                >
                  <LottieView
                    autoPlay={true}
                    loop={true}
                    source={require("../../../assets/Images/loading2.json")}
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
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.props.func(item.imageURL)}
                >
                  <Animated.View entering={BounceIn.duration(500).delay(300)}>
                    {/* <Image style={[styles.Image , changeBackgroundColor(this.props.theme)]} source={{uri : item.imageURL}} /> */}
                    <FastImage
                      style={[
                        styles.Image,
                        changeBackgroundColor(this.props.theme),
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
