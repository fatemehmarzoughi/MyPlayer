import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { checkLoginStatus } from "../Auth/checkLoginStatus";
import Context from "context/context";

export default class EnteriesOptions extends React.Component {
  static contextType = Context;

  componentDidMount () {
  }

  createAcount = async () => {
    try {
      console.log("checking..");
      await checkLoginStatus(this.context.setIsLogin);
      this.props.navigation.navigate("Auth");
    } catch (err) { console.log(err); };
  };

  render () {
    return (
            <View style={styles.container}>
                <LottieView loop={true} autoPlay={true} style={styles.imageStyle} source={require("../../assets/Images/account.json")} />
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                       style={styles.mainBtn}
                       onPress={() => this.createAcount()}
                    >
                       <Text style={styles.BtnText}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.minorBtn} onPress={() => this.props.navigation.navigate("Home")}>
                       <Text style={styles.BtnText}>Join as a guest</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
  }
}
