import React from "react";
import { dark, white } from "src/assets";
import Context from "src/context/context";
import { View, TextInput } from "react-native";
import { backgroundColor, surfaceColor } from "src/components";


import { styles } from "./style";

export class Search extends React.PureComponent {
  declare context: React.ContextType<typeof Context>

  override render() {
    return (
      <View style={[backgroundColor(this.context.theme), { flex: 1 }]}>
        <TextInput
          placeholder="Search"
          style={[surfaceColor(this.context.theme), styles.input]}
          placeholderTextColor={this.context.theme ? dark : white}
        />
      </View>
    );
  }
}
