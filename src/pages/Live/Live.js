/* eslint-disable no-unused-vars */
import React from "react";
import MainHeader from "components/pagesHeader/MainHeader";
import Tabs from "./Tabs";
import { NativeBaseProvider } from "native-base";

export default class Live extends React.Component {
  constructor () {
    super();
    this.state = {
      // animation : '',
      index: 0,
      routes: [
        { key: "first", title: "First" },
        { key: "second", title: "Second" }
      ]
    };
  }
  // animation = () => {
  //     console.log('pressed ' + this.state.animation)
  //     this.setState({
  //         animation : ZoomInRotate
  //     })
  // }

  render () {
    return (
            <NativeBaseProvider>
                <MainHeader
                    isLive={true}
                    searchOnPress={() => this.props.navigation.navigate("Search") }
                    menuOnPress={() => this.props.navigation.openDrawer()}
                />
                {/* <Animated.Text entering={this.state.animation}>my text</Animated.Text> */}
                {/* <NativeText bold={true} textAlign="center" fontSize={20}>Live</NativeText> */}
                <Tabs />
            </NativeBaseProvider>
    );
  }
}
