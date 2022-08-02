import * as React from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import * as Colors from "assets/constants/Colors";
import Radio from "./RadioTab/Radio";
import TV from "./TVTab/TV";
import Stared from "./StaredTab/Stared";
import Icon from "react-native-vector-icons/Ionicons";

const renderScene = ({ route }) => {
  switch (route.key) {
    case "TV":
      return <TV />;

    case "Radio":
      return <Radio />;

    case "Stared":
      return <Stared />;

    default:
      return null;
  }
};

const renderTabBar = props => (
  <TabBar
    {...props}
    renderIcon={({ route, focused, color }) => (
      (route.key === "Stared")
        ? (
       <Icon
         name={focused ? "star" : "star-outline"}
         color={color}
         size={20}
       />
          )
        : (null)
    )}
    // indicatorStyle={{ backgroundColor: Colors.white }}
    style={{ backgroundColor: null }}
    activeColor={Colors.mainColor}
    inactiveColor={Colors.dark}
    indicatorStyle={{
      backgroundColor: Colors.mainColor
    }}
  />
);

export default function Tabs () {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "TV", title: "TV" },
    { key: "Radio", title: "Radio" },
    { key: "Stared", icon: <Icon name="return-down-back-outline" size={20} color="red" /> }
  ]);

  return (
    <TabView
      style={styles.tab}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  tab: {
    marginTop: 20
  }
});
