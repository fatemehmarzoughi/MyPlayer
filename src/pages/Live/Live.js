import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import MainHeader from 'components/pagesHeader/MainHeader'
import Animated , { ZoomInRotate , Transition} from 'react-native-reanimated'; 
import { width, height } from '/assets/constants/Units'
import { Text as NativeText } from 'native-base';
import About from '/pages/About/About';
import { mainColor, gray } from '/assets/constants/Colors';
import { TabView, SceneMap } from 'react-native-tab-view';


export default class Live extends React.Component{
    constructor(){
        super();
        this.state = {
            // animation : '',
            index : 0,
            routes : [
              { key: 'first', title: 'First' },
              { key: 'second', title: 'Second' },
            ]
        }
    }
    // animation = () => {
    //     console.log('pressed ' + this.state.animation)
    //     this.setState({
    //         animation : ZoomInRotate
    //     })
    // }


    render(){
        return(
            <View>
                <MainHeader
                    searchOnPress={() => this.props.navigation.navigate('Search') } 
                    menuOnPress={() => this.props.navigation.openDrawer()} 
                />
                {/* <Animated.Text entering={this.state.animation}>my text</Animated.Text> */}
                <NativeText bold={true} textAlign="center" fontSize={20}>Live</NativeText>
                {/* <TabView
                  navigationState={ this.state.index, this.state.routes }
                  renderScene={SceneMap({
                    first: <Text>first</Text>,
                    second: <Text>second</Text>,
                  })}
                  onIndexChange={(index) => this.setState({ index })}
                  initialLayout={{ width: width }}
                /> */}
            </View>
        )
    }
}

function LiveTabs(){
    return (
        <Tab.Navigator style={[styles.topTabBar]}
         screenOptions={{
            tabBarActiveTintColor : mainColor,
            tabBarInactiveTintColor : gray,
            tabBarPressColor : gray,
            tabBarStyle: { padding : 5, shadowColor : mainColor, elevation:0},
            tabBarIndicatorStyle : { backgroundColor : mainColor, elevation:0},
         }}
        >
            <Tab.Screen 
            //  screenOptions={{
            //     title : 'Create Account'
            //  }}‍‍
             name="tab1"
             component={Live}
            />
            <Tab.Screen 
             name="tab2"
             component={Live}
            />

        </Tab.Navigator>
    )
}