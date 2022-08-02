import React from "react";
import { ScrollView, TextInput, View } from "react-native";
import { styles } from "./style";
import { POST } from "API/index";
import Toast from "react-native-toast-message";
import { toastMessageDuration } from "assets/constants/Units";
import SavingModal from "components/Modals/SavingBoxModal";
import * as Colors from "assets/constants/Colors";
import { changeBackgroundColor, changeColor } from "components/lightDarkTheme";
import context from "context/context";

export default class ResetPassword extends React.Component {
  static contextType = context;

  constructor () {
    super();
    this.state = {
      oldPass: "",
      newPass: "",
      saving: false
    };
  }

  onCancel = () => {
    this.props.navigation.navigate("Profile");
  };

  onSave = async () => {
    this.setState({
      saving: true
    });

    const reqBody = {
      oldPass: this.state.oldPass,
      newPass: this.state.newPass
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
          bottomOffset: 40
        });
        this.setState({
          saving: false
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
          bottomOffset: 40
        });
      };
      this.setState({
        saving: false
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
        bottomOffset: 40
      });
      this.setState({
        saving: false
      });
    }
  };

  handleOldPass = (oldPass) => {
    this.setState({
      oldPass
    });
  };

  handleNewPass = (newPass) => {
    this.setState({
      newPass
    });
  };

  render () {
    return (
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.header}>
                        <View style={styles.row1}>
                           <TouchableOpacity onPress={() => this.onSave()} style={styles.btn}>
                               <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                           <TouchableOpacity onPress={() => this.onCancel()} style={styles.btn}>
                               <Text style={[styles.cancelText, changeColor(this.context.theme)]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.title}>Reset Password</Text>
                        </View>
                    </View>

                    <TextInput
                      placeholder="Old Password"
                      placeholderTextColor={this.context.theme ? Colors.dark : Colors.white}
                      style={[styles.input, changeBackgroundColor(this.context.theme)]}
                      secureTextEntry={true}
                      onChangeText={(input) => this.handleOldPass(input) }
                    />
                    <TextInput
                      placeholder="New Password"
                      placeholderTextColor={this.context.theme ? Colors.dark : Colors.white}
                      style={[styles.input, changeBackgroundColor(this.context.theme)]}
                      secureTextEntry={true}
                      onChangeText={(input) => this.handleNewPass(input) }
                    />
                </View>
                <SavingModal modalVisible={this.state.saving} />
            </ScrollView>
    );
  }
}
