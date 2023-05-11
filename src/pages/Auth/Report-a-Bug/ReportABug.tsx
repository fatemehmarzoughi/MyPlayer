import React from "react";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import { NavigationScreenProp } from "react-navigation";
import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";

import { POST } from "~/API/index";
import context from "~/context/context";
import * as Colors from "~/assets/constants/Colors";
import Header from "~/components/pagesHeader/Header";
import { toastMessageDuration } from "~/assets/constants/Units";

import { styles } from "./style";

export interface IReportABugProps extends NavigationScreenProp<any, any> {
  navigation: NavigationScreenProp<any, any>;
}

export interface IReportABugStates {
  input: string;
  loading: boolean;
}
export default class ReportABug extends React.Component<
  IReportABugProps,
  IReportABugStates
> {
  declare context: React.ContextType<typeof context>

  constructor(props: IReportABugProps) {
    super(props);
    this.state = {
      input: "",
      loading: false,
    };
  }

  handleTextInput = (input: string) => {
    this.setState({
      input,
    });
  };

  handleReport = async () => {
    this.setState({
      loading: true,
    });
    if (this.state.input === "") {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Text input is empty",
        text2: "Please explain the bug.",
        visibilityTime: toastMessageDuration,
        topOffset: 30,
        bottomOffset: 40,
      });
      this.setState({
        loading: false,
      });
      return;
    }

    const reqBody = {
      bugExplenation: this.state.input,
    };

    try {
      const result = await POST("/editProfile/reportBug", reqBody);
      const message = await result.text();
      if (result.status === 200) {
        Toast.show({
          type: "success",
          position: "top",
          autoHide: true,
          text1: message,
          text2: "Thanks for the feedback",
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.setState({
          loading: false,
        });
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          autoHide: true,
          text1: message,
          text2: "Please try again",
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.setState({
          loading: false,
        });
      }

      console.log(this.state.loading);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        position: "bottom",
        autoHide: true,
        text1: "Something went wrong",
        text2: "Please check your network",
        visibilityTime: toastMessageDuration,
        topOffset: 30,
        bottomOffset: 40,
      });
      this.setState({
        loading: false,
      });
    }
  };

  override render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Header
            title="Report a Bug"
            customClick={() => this.props.navigation.navigate("Profile")}
          />
          <TextInput
            placeholder="Your explenation goes here ... "
            placeholderTextColor={
              this.context.theme ? Colors.dark : Colors.white
            }
            style={styles.input}
            onChangeText={(input) => this.handleTextInput(input)}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.handleReport()}
          >
            <LottieView
              style={this.state.loading ? { opacity: 1 } : { opacity: 0 }}
              autoPlay={true}
              loop={true}
              source={require("../../../assets/Images/loading.json")}
            />
            <Text style={styles.btnText}>Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
