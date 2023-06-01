import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import context from "src/context/context";
import { changeColor } from "src/components";
import { statusBarIOS, width } from "src/assets/constants";

export interface IMainHeaderProps {
  menuOnPress: () => void;

  isLive?: boolean;
  searchOnPress?: () => void;
}

export interface IMainHeaderStates {}

export class MainHeader extends React.Component<
  IMainHeaderProps,
  IMainHeaderStates
> {
  declare context: React.ContextType<typeof context>

  override render() {
    return (
      <View style={[styles.container]}>
        <Icon
          onPress={this.props.menuOnPress}
          size={22}
          style={[styles.icon, changeColor(this.context.theme)]}
          name="menu"
        />
        <Text style={[styles.title, changeColor(this.context.theme)]}>
          {this.props.isLive ? "Live" : "MyPlayer"}
        </Text>
        <Icon
          onPress={this.props.searchOnPress}
          size={22}
          style={[styles.icon, changeColor(this.context.theme)]}
          name="search"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: statusBarIOS,
    padding: 15,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    paddingRight: 10,
    paddingLeft: 10,
  },
});
