import React from "react";
import LottieView from "lottie-react-native";
import { NavigationProp } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Context from "src/context/context";
import { checkLoginStatus } from "src";

import { styles } from "./styles";

export interface IEntriesOptionsProps {
  navigation: NavigationProp<any, any>;
}

export interface IEntriesOptionsStates {}

export class EntriesOptions extends React.PureComponent<
  IEntriesOptionsProps,
  IEntriesOptionsStates
> {
  declare context: React.ContextType<typeof Context>

  override componentDidMount() {}

  override render() {
    return (
      <View style={styles.container}>
        <LottieView
          loop={true}
          autoPlay={true}
          style={styles.imageStyle}
          source={require("../../assets/Images/account.json")}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.mainBtn}
            onPress={() => this.props.navigation.navigate("appRoute")}
          >
            <Text style={styles.BtnText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minorBtn}
            onPress={() => this.props.navigation.navigate("appRoute")}
          >
            <Text style={styles.BtnText}>Join the App</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
