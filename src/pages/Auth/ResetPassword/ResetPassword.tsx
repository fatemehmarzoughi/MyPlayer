import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Toast from "react-native-toast-message";
import { NavigationScreenProp } from "react-navigation";

import {
  changeColor,
  changeBackgroundColor,
} from "~/components/lightDarkTheme";
import { POST } from "~/API/index";
import * as Colors from "~/assets/constants/Colors";
import SavingModal from "~/components/Modals/SavingBoxModal";
import { toastMessageDuration } from "~/assets/constants/Units";

import { styles } from "./style";
import Header2 from "~/components/pagesHeader/Header2";
export interface IResetPasswordProps extends NavigationScreenProp<any, any> {
  navigation: NavigationScreenProp<any, any>;
}
export interface IResetPasswordState {
  oldPass: string;
  newPass: string;
  saving: boolean;
}
export default class ResetPassword extends React.Component<
  IResetPasswordProps,
  IResetPasswordState
> {
  constructor(props: IResetPasswordProps) {
    super(props);
    this.state = {
      oldPass: "",
      newPass: "",
      saving: false,
    };
  }

  onCancel = () => {
    this.props.navigation.navigate("Profile");
  };

  onSave = async () => {
    this.setState({
      saving: true,
    });

    const reqBody = {
      oldPass: this.state.oldPass,
      newPass: this.state.newPass,
    };

    try {
      const result = await POST("/editProfile/resetPass", reqBody);
      const message = await result.text();
      if (result.status === 200) {
        Toast.show({
          type: "success",
          position: "top",
          autoHide: true,
          text1: message,
          text2: "Your new Password is available for login",
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.setState({
          saving: false,
        });
        this.props.navigation.navigate("Profile");
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
      }
      this.setState({
        saving: false,
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        position: "bottom",
        autoHide: true,
        text1: "Something went wrong",
        text2: "Please try again",
        visibilityTime: toastMessageDuration,
        topOffset: 30,
        bottomOffset: 40,
      });
      this.setState({
        saving: false,
      });
    }
  };

  handleOldPass = (oldPass: string) => {
    this.setState({
      oldPass,
    });
  };

  handleNewPass = (newPass: string) => {
    this.setState({
      newPass,
    });
  };

  override render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Header2
            onSave={this.onSave}
            onCancel={this.onCancel}
            title="Reset Password"
          />

          <TextInput
            placeholder="Old Password"
            placeholderTextColor={
              this.context.theme ? Colors.dark : Colors.white
            }
            style={[styles.input, changeBackgroundColor(this.context.theme)]}
            secureTextEntry={true}
            onChangeText={(input) => this.handleOldPass(input)}
          />
          <TextInput
            placeholder="New Password"
            placeholderTextColor={
              this.context.theme ? Colors.dark : Colors.white
            }
            style={[styles.input, changeBackgroundColor(this.context.theme)]}
            secureTextEntry={true}
            onChangeText={(input) => this.handleNewPass(input)}
          />
        </View>
        <SavingModal modalVisible={this.state.saving} />
      </ScrollView>
    );
  }
}
