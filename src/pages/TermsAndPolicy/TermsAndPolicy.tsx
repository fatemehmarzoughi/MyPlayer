import React from "react";
import { Text } from "native-base";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationScreenProp } from "react-navigation";
import { View, TouchableOpacity, ScrollView } from "react-native";

import {
  changeColor,
  changeBackgroundColor,
  changeBackgroundColor2,
} from "@/components/lightDarkTheme";
import MainHeader from "@/components/pagesHeader/MainHeader";
import context from "@/context/context";

import { styles } from "./style";

export interface IAboutProps extends NavigationScreenProp<any, any> {
  navigation: { openDrawer: () => void } & NavigationScreenProp<any, any>;
}

export interface IAboutState {
  item1IsCollapse: boolean;
  item2IsCollapse: boolean;
}
export default class About extends React.Component<IAboutProps, IAboutState> {
  declare context: React.ContextType<typeof context>

  constructor(props: IAboutProps) {
    super(props);
    this.state = {
      item1IsCollapse: false,
      item2IsCollapse: false,
    };
  }

  collapse = (item: 0 | 1) => {
    switch (item) {
      case 0:
        this.setState({ item1IsCollapse: !this.state.item1IsCollapse });
        break;
      case 1:
        this.setState({ item2IsCollapse: !this.state.item2IsCollapse });
        break;

      default:
        break;
    }
  };

  override render() {
    return (
      <View style={[changeBackgroundColor(this.context.theme), { flex: 1 }]}>
        <MainHeader
          menuOnPress={() => this.props.navigation.openDrawer()}
          searchOnPress={() => this.props.navigation.navigate("Search")}
        />
        <ScrollView style={{ paddingBottom: 100 }}>
          <Text
            style={changeColor(this.context.theme)}
            bold={true}
            textAlign="center"
            fontSize="xl"
            marginTop={5}
          >
            Terms and Policy
          </Text>
          <Text
            style={changeColor(this.context.theme)}
            textAlign="center"
            marginRight={10}
            marginLeft={10}
            marginTop={5}
          >
            By installing the app you have already accepted our Terms and
            Policies
          </Text>
          <TouchableOpacity
            onPress={() => this.collapse(0)}
            style={[changeBackgroundColor2(this.context.theme), styles.box]}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={changeColor(this.context.theme)} bold={true}>
                Terms of Service
              </Text>
              <Icon
                style={changeColor(this.context.theme)}
                size={20}
                name="chevron-up"
              />
            </View>
            <Collapsible
              duration={500}
              collapsed={this.state.item1IsCollapse}
              enablePointerEvents={true}
            >
              <Text
                style={changeColor(this.context.theme)}
                textAlign="justify"
                marginTop={5}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Collapsible>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.collapse(1)}
            style={[
              changeBackgroundColor2(this.context.theme),
              styles.box,
              { marginBottom: 100 },
            ]}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={changeColor(this.context.theme)} bold={true}>
                Acceptance of terms
              </Text>
              <Icon
                style={changeColor(this.context.theme)}
                size={20}
                name="chevron-up"
              />
            </View>
            <Collapsible
              duration={500}
              collapsed={this.state.item2IsCollapse}
              enablePointerEvents={true}
            >
              <Text
                style={changeColor(this.context.theme)}
                textAlign="justify"
                marginTop={5}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </Collapsible>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
