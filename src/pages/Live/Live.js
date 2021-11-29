import React from 'react';
import {Text, View} from 'react-native';
import MainHeader from 'components/pagesHeader/MainHeader'
import Animated , { ZoomInRotate , Transition} from 'react-native-reanimated'; 


export default class Live extends React.Component{
    constructor(){
        super();
        this.state = {
            animation : '',
        }
    }
    animation = () => {
        console.log('pressed ' + this.state.animation)
        this.setState({
            animation : ZoomInRotate
        })
    }
    render(){
        return(
            <View style={{backgroundColor:'red'}}>
                <MainHeader
                    searchOnPress={() => this.props.navigation.navigate('Search') } 
                    menuOnPress={() => this.props.navigation.openDrawer()} 
                />
                <Animated.Text entering={this.state.animation}>my text</Animated.Text>
            </View>
        )
    }
}
