import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import * as Colors from "assets/constants/Colors";
import { changeColor } from "components/lightDarkTheme";
import { width } from "assets/constants/Units";

const usedWidth = width - 20;

export default class Header extends React.Component {
  render () {
    return (
            <View style={[styles.header]}>
                <TouchableOpacity onPress={this.props.customClick} style={styles.iconBack}>
                   <Icon name="chevron-left" size={40} color={Colors.white} />
                </TouchableOpacity>
                <Text style={[styles.title, changeColor(this.props.theme)]}>{this.props.title}</Text>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: usedWidth,
    flexDirection: "row"
    // margin : 10,
  },
  iconBack: {
    backgroundColor: Colors.mainColor,
    borderRadius: 15,
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0
  },
  title: {
    fontWeight: "bold",
    marginRight: "auto",
    marginLeft: "auto",
    alignSelf: "flex-start"
  }
});
