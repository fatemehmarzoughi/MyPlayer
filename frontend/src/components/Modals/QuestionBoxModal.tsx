import React from "react";
import { Modal, StyleSheet, View, Text, TouchableOpacity } from "react-native";

import * as Colors from "src/assets/constants/Colors";
import { width, height } from "src/assets";

export interface IModalClassProps {
  btnTitle: string;
  question: string;
  modalVisible: boolean;

  cancelModal?: () => void;
  handleMainBtn: () => void;
  handleCancelBtn: () => void;
}
export interface IModalClassStates {}

export class ModalClass extends React.PureComponent<
  IModalClassProps,
  IModalClassStates
> {
  override render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        transparent={true}
        onRequestClose={this.props.cancelModal}
      >
        <View testID="container" style={styles.container}>
          <View style={styles.modalStyle}>
            <Text style={styles.textColor}>{this.props.question}</Text>
            <View style={styles.btns}>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={this.props.handleMainBtn}
              >
                <Text style={styles.textColor}>{this.props.btnTitle}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnStyle}
                onPress={this.props.handleCancelBtn}
              >
                <Text style={[styles.textColor]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const usedWidth = width - 20;
const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: Colors.mainColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "auto",
    marginLeft: "auto",
    width: usedWidth,
    padding: 30,
    borderRadius: 10,
  },
  btns: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: usedWidth,
    flexDirection: "row-reverse",
    marginTop: 30,
  },
  btnStyle: {
    padding: 20,
    paddingRight: 30,
    paddingLeft: 30,
    borderStyle: "solid",
    borderColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
  },
  textColor: {
    color: Colors.white,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.6)",
    height,
    width,
  },
});
