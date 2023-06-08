import React from "react";
import Icon from "react-native-vector-icons/EvilIcons";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Context from "src/context/context";
import { width } from "src/assets";
import * as Colors from "src/assets/constants/Colors";
import { contentColor } from "src/components/lightDarkTheme";

const usedWidth = width - 20;

export interface IHeaderProps {
  customClick: () => void;
  title: string;
}

export interface IHeaderState {}

export class Header extends React.PureComponent<
  IHeaderProps,
  IHeaderState
> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  override render() {
    return (
      <View style={[styles.header]}>
        <TouchableOpacity
          onPress={this.props.customClick}
          style={styles.iconBack}
        >
          <Icon name="chevron-left" size={40} color={Colors.white} />
        </TouchableOpacity>
        <Text style={[styles.title, contentColor(this.context.theme)]}>
          {this.props.title}
        </Text>
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
    flexDirection: "row",
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
    left: 0,
  },
  title: {
    fontWeight: "bold",
    marginRight: "auto",
    marginLeft: "auto",
    alignSelf: "flex-start",
  },
});
