import React from "react";
import { dark, white } from "src/assets";
import Context from "src/context/context";
import { View, TextInput } from "react-native";
import { changeBackgroundColor2, changeBackgroundColor } from "src/components";

import { styles } from "./style";

export class Search extends React.Component {
  declare context: React.ContextType<typeof Context>

  override render() {
    return (
      <View style={[changeBackgroundColor(this.context.theme), { flex: 1 }]}>
        <TextInput
          placeholder="Search"
          style={[changeBackgroundColor2(this.context.theme), styles.input]}
          placeholderTextColor={this.context.theme ? dark : white}
        />
      </View>
    );
  }
}
