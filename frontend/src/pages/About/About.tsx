import React from "react";
import { VStack, Text, Button } from "native-base";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationProp } from "@react-navigation/native";
import { View, TouchableOpacity, ScrollView } from "react-native";

import Context from "src/context/context";
import { contentColor, surfaceColor } from "src/components";
import { MainHeader } from "src/components";

import { styles } from "./style";

export type IAboutState = {
  item1IsCollapse: boolean;
  item2IsCollapse: boolean;
};

export interface IAboutProps {
  navigation: { openDrawer: () => void } & NavigationProp<any, any>;
}

export class About extends React.PureComponent<IAboutProps, IAboutState> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  constructor(props: IAboutProps) {
    super(props);
    this.state = {
      item1IsCollapse: false,
      item2IsCollapse: false,
    };
  }

  collapse = (item: number) => {
    switch (item) {
      case 0:
        this.setState({ item1IsCollapse: !this.state.item1IsCollapse });
        break;
      case 1:
        this.setState({ item2IsCollapse: !this.state.item2IsCollapse });
        break;
    }
  };

  override render() {
    return (
      <View style={{ flex: 1 }}>
        <MainHeader
          menuOnPress={() => this.props.navigation.openDrawer()}
          searchOnPress={() => this.props.navigation.navigate("Search")}
        />
        <ScrollView style={{ paddingBottom: 100 }}>
          <VStack
            flexDirection="row"
            justifyContent="space-between"
            style={[surfaceColor(this.context.theme), styles.box]}
          >
            <Text style={contentColor(this.context.theme)} bold={true}>
              Company name :{" "}
            </Text>
            <Text style={contentColor(this.context.theme)}>My Player</Text>
          </VStack>
          <VStack
            flexDirection="row"
            justifyContent="space-between"
            style={[surfaceColor(this.context.theme), styles.box]}
          >
            <Text style={contentColor(this.context.theme)} bold={true}>
              Version :{" "}
            </Text>
            <Text style={contentColor(this.context.theme)}>1.0</Text>
          </VStack>
          <VStack
            justifyContent="space-between"
            style={[surfaceColor(this.context.theme), styles.box]}
          >
            <Text style={contentColor(this.context.theme)} bold={true}>
              Sponsors
            </Text>
            <Text
              style={contentColor(this.context.theme)}
              marginTop={5}
              textAlign="center"
            >
              London’s Best Lebanese Resturant and Bar
            </Text>
            <Button
              variant="solid"
              size="lg"
              colorScheme="orange"
              style={styles.btn}
            >
              Visit Site
            </Button>
          </VStack>

          <TouchableOpacity
            onPress={() => this.collapse(0)}
            style={[surfaceColor(this.context.theme), styles.box]}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={contentColor(this.context.theme)} bold={true}>
                Why we?
              </Text>
              <Icon
                style={contentColor(this.context.theme)}
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
                style={contentColor(this.context.theme)}
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
              surfaceColor(this.context.theme),
              styles.box,
              { marginBottom: 100 },
            ]}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={contentColor(this.context.theme)} bold={true}>
                Contact US
              </Text>
              <Icon
                style={contentColor(this.context.theme)}
                size={20}
                name="chevron-up"
              />
            </View>
            <Collapsible
              duration={500}
              collapsed={this.state.item2IsCollapse}
              enablePointerEvents={true}
            >
              <VStack flexDirection="row" marginTop={5}>
                <Text style={contentColor(this.context.theme)} bold={true}>
                  Phone Number :{" "}
                </Text>
                <Text style={contentColor(this.context.theme)}>
                  001-11111111
                </Text>
              </VStack>
              <VStack flexDirection="row">
                <Text style={contentColor(this.context.theme)} bold={true}>
                  Email :{" "}
                </Text>
                <Text style={contentColor(this.context.theme)}>
                  myplayer@gmail.com
                </Text>
              </VStack>
              <VStack flexDirection="row">
                <Text style={contentColor(this.context.theme)} bold={true}>
                  Website :{" "}
                </Text>
                <Text style={contentColor(this.context.theme)}>
                  www.myplayer.com
                </Text>
              </VStack>
              {/* <VStack flexDirection="row" marginTop={5}>
                          <VStack>
                            <Text style={contentColor(this.context.theme)} bold={true}>Phone Number : </Text>
                            <Text style={contentColor(this.context.theme)} bold={true}>Email : </Text>
                            <Text style={contentColor(this.context.theme)} bold={true}>Website : </Text>
                          </VStack>
                          <VStack marginLeft={10}>
                            <Text style={contentColor(this.context.theme)}>001-11111111</Text>
                            <Text style={contentColor(this.context.theme)}>myplayer@gmail.com</Text>
                            <Text style={contentColor(this.context.theme)}>www.myplayer.com</Text>
                          </VStack>
                        </VStack> */}
            </Collapsible>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
