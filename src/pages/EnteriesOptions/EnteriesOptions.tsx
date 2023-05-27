import React from "react";
import LottieView from "lottie-react-native";
import { NavigationProp } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Context from "src/context/context";
import { checkLoginStatus } from "src";

import { styles } from "./styles";

export interface IEnteriesOptionsProps extends NavigationProp<any, any> {
  navigation: NavigationProp<any, any>;
}

export interface IEnteriesOptionsStates {}

export class EnteriesOptions extends React.Component<
  IEnteriesOptionsProps,
  IEnteriesOptionsStates
> {
  declare context: React.ContextType<typeof Context>

  override componentDidMount() {}

  createAcount = async () => {
    try {
      console.log("checking..");
      await checkLoginStatus(this.context.setIsLogin);
      this.props.navigation.navigate("Auth");
    } catch (err) {
      console.log(err);
    }
  };

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
            onPress={() => this.createAcount()}
          >
            <Text style={styles.BtnText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minorBtn}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.BtnText}>Join as a guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
