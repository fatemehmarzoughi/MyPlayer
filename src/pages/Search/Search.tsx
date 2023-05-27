import React from "react";
import { View, TextInput } from "react-native";

import {
  changeBackgroundColor,
  changeBackgroundColor2,
} from "@/components/lightDarkTheme";
import context from "@/context/context";
import * as Colors from "@/assets/constants/Colors";

import { styles } from "./style";

export default class Search extends React.Component {
  declare context: React.ContextType<typeof context>

  override render() {
    return (
      <View style={[changeBackgroundColor(this.context.theme), { flex: 1 }]}>
        <TextInput
          placeholder="Search"
          style={[changeBackgroundColor2(this.context.theme), styles.input]}
          placeholderTextColor={this.context.theme ? Colors.dark : Colors.white}
        />
      </View>
    );
  }
}
