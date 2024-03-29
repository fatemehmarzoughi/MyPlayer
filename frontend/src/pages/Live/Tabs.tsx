import React, { useState, useCallback} from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import {useWindowDimensions, StyleSheet} from 'react-native';
import {TabView, TabBar, Route} from 'react-native-tab-view';
import {TV} from './TVTab';
import {Radio} from './RadioTab';
import {Stared} from './StaredTab';
import {dark, mainColor} from 'src/assets';

export const Tabs: React.FC = React.memo(() => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    {key: 'TV', title: 'TV'},
    {key: 'Radio', title: 'Radio'},
    {
      key: 'Stared',
      icon: 'return-down-back-outline', // <Icon name="return-down-back-outline" size={20} color="red" />
    },
  ]);

  const renderScene = useCallback((key: Route['key']) => {
    switch (key) {
      case 'TV':
        return <TV />;

      case 'Radio':
        return <Radio />;

      case 'Stared':
        return <Stared />;

      default:
        return null;
    }
  }, []);

  const renderTabBar = useCallback((props: any) => {
    return (
      <TabBar
        renderIcon={({route, focused, color}) =>
          route.key === 'Stared' ? (
            <Icon
              name={focused ? 'star' : 'star-outline'}
              color={color}
              size={20}
            />
          ) : null
        }
        // indicatorStyle={{ backgroundColor: white }}
        style={{backgroundColor: 'none'}}
        activeColor={mainColor}
        inactiveColor={dark}
        indicatorStyle={{
          backgroundColor: mainColor,
        }}
        {...props}
      />
    );
  }, []);

  return (
    <TabView
      style={styles.tab}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      initialLayout={{width: layout.width}}
      renderScene={props => renderScene(props.route.key)}
    />
  );
})

const styles = StyleSheet.create({
  tab: {
    marginTop: 20,
  },
});
