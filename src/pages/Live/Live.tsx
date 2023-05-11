import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationScreenProp } from "react-navigation";

import Tabs from "./Tabs";
import MainHeader from "~/components/pagesHeader/MainHeader";

export interface ILiveProps extends NavigationScreenProp<any, any> {
  navigation: { openDrawer: () => void } & NavigationScreenProp<any, any>;
}

export interface ILiveStates {
  index: number;
  routes: [
    { key: "first"; title: "First" },
    { key: "second"; title: "Second" }
  ];
}
export default class Live extends React.Component<ILiveProps, ILiveStates> {
  constructor(props: ILiveProps) {
    super(props);
    this.state = {
      // animation : '',
      index: 0,
      routes: [
        { key: "first", title: "First" },
        { key: "second", title: "Second" },
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
      <NativeBaseProvider>
        <MainHeader
          isLive={true}
          searchOnPress={() => this.props.navigation.navigate("Search")}
          menuOnPress={() => this.props.navigation.openDrawer()}
        />
        {/* <Animated.Text entering={this.state.animation}>my text</Animated.Text> */}
        {/* <NativeText bold={true} textAlign="center" fontSize={20}>Live</NativeText> */}
        <Tabs />
      </NativeBaseProvider>
    );
  }
}
