import React from 'react';
import { Text, View, Animated, Dimensions } from 'react-native';
import { styles } from './style';
import { StatusBar } from 'expo-status-bar';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { height, width } from '../assets/constants/Units';
import { mainColor, white } from '../assets/constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import context from '../context/context';

const unset = '#70757a00';

export default class OnBoarding extends React.Component{

    static contextType = context;

    constructor(){
        super();
        this.state={
            currentStatus : 1,
            translateXValue : new Animated.Value(3*width/2),
            translateXValueIsRotate : new Animated.Value(3*height/2),
            case1 : mainColor,
            case2 : unset,
            case3 : unset,
            case4 : unset,
            nextText : 'Next',
            lastPage : false,
            visibleCase1 : 0,
            progress: new Animated.Value(0),
            isRotate : false,
        }
    }

    swipeLeft = (state) => {
        switch(this.state.currentStatus)
        {
            case 1 : 
            {

                Animated.timing(this.state.translateXValueIsRotate , {
                    toValue : height/2,
                    duration : 200,
                    useNativeDriver: true
                }).start()

                Animated.timing(this.state.translateXValue , {
                    toValue : width/2,
                    duration : 200,
                    useNativeDriver: true
                }).start();

                this.setState({
                    case1 : unset,
                    case2 : mainColor,
                    currentStatus : 2,
                    nextText : 'Next',
                });
            }
            break;
            case 2 : 
            {

                Animated.timing(this.state.translateXValueIsRotate , {
                    toValue : -height/2,
                    duration : 200,
                    useNativeDriver: true
                }).start()

                Animated.timing(this.state.translateXValue , {
                    toValue : -width/2,
                    duration : 200,
                    useNativeDriver: true
                }).start()

                this.setState({
                    case2 : unset,
                    case3 : mainColor,
                    currentStatus : 3,
                    nextText : 'Next'
                });
                console.log(this.state.case2)
            }
            break;
            case 3 : 
            {
                 Animated.timing(this.state.translateXValueIsRotate , {
                     toValue : -3*height/2,
                     duration : 200,
                     useNativeDriver: true
                 }).start()

                 Animated.timing(this.state.translateXValue , {
                     toValue : -3*width/2,
                     duration : 200,
                     useNativeDriver: true
                 }).start();
                this.setState({
                    case3 : unset,
                    case4 : mainColor,
                    currentStatus : 4,
                    nextText : 'Get Started',
                    lastPage : true,
                });
            }
            break;

        }
    }

    swipeRight = (state) => {
        switch(this.state.currentStatus)
        {
            case 1 : 
            {
                this.setState({
                    nextText : 'Next'
                })
            }
            break;
            case 2 : 
            {
                Animated.timing(this.state.translateXValue , {
                    toValue : 3*width/2,
                    duration : 200,
                    useNativeDriver: true
                }).start();

                Animated.timing(this.state.translateXValueIsRotate , {
                    toValue : 3*height/2,
                    duration : 200,
                    useNativeDriver: true
                }).start();

                this.setState({
                    case1 : mainColor,
                    case2 : unset,
                    currentStatus : 1,
                    nextText : 'Next',
                    visibleCase1 : true,
                });
                Animated.timing(this.state.progress, {
                    toValue: 0,
                    duration: 6000,
                    useNativeDriver: true
                  }).start();
            }
            break;
            case 3 : 
            {
                Animated.timing(this.state.translateXValue , {
                    toValue :  width/2,
                    duration : 200,
                    useNativeDriver: true
                }).start();

                Animated.timing(this.state.translateXValueIsRotate , {
                    toValue :  height/2,
                    duration : 200,
                    useNativeDriver: true
                }).start();

                this.setState({
                    case2 : mainColor,
                    case3 : unset,
                    currentStatus : 2,
                    nextText : 'Next'

                });
            }
            break;
            case 4 : 
            {
                Animated.timing(this.state.translateXValue , {
                    toValue :  -width/2,
                    duration : 200,
                    useNativeDriver: true
                }).start();

                Animated.timing(this.state.translateXValueIsRotate , {
                    toValue :  -height/2,
                    duration : 200,
                    useNativeDriver: true
                }).start();

                this.setState({
                    case3 : mainColor,
                    case4 : unset,
                    currentStatus : 3,
                    nextText : 'Next',
                    lastPage : false,
                });
            }
            break;

        }
    }

    componentDidMount(){
        console.log(this.state.progress)
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 6000,
            useNativeDriver: true
        }).start();

        Dimensions.addEventListener('change' , ({window : {width , height}})=> {
            if(width > height)
            {
                this.context.setIsRotate(true)
                console.log('is rotate true')
            }
            else 
            {
                this.context.setIsRotate(false)
            }
        });
    }

    
    render(){
        console.log(this.context.isRotate)
        return(
            <View style={[this.context.isRotate ? styles.containerIsRotate : styles.container]}>
                <StatusBar backgroundColor = '#333' translucent={false} hidden />
                <GestureRecognizer
                 style={styles.GestureRecognizerStyle} 
                 onSwipeRight={(state) => this.swipeRight(state)}
                 onSwipeLeft={(state) => this.swipeLeft(state)}
                >
                    <Animated.View 
                        style={[
                            this.context.isRotate ? 
                                styles.AllpagesIsRotate : 
                                styles.Allpages ,

                            this.context.isRotate ? 
                                {transform : [{ translateX : this.state.translateXValueIsRotate }]} : 
                                {transform : [{ translateX : this.state.translateXValue }]}
                            ]}
                    >
                        <View style={[this.context.isRotate ? styles.pageStyleIsRotate : styles.pageStyle]}>
                        <View style={styles.content}>
                             <LottieView style={[this.context.isRotate ? styles.ImageIsRotate : styles.image]} source={require('../assets/Images/offline2.json')} progress={this.state.progress}/>
                             <Text style={styles.contentText}>You can enjoy listening to Musics or Watching Videos by saving your lovly items and using the MyApp Offline feature</Text>
                        </View>
                    </View>
                        <View style={[this.context.isRotate ? styles.pageStyleIsRotate : styles.pageStyle]}>
                       <View style={styles.content}>
                            <LottieView style={[this.context.isRotate ? styles.ImageIsRotate : styles.image]} source={require('../assets/Images/offline2.json')} progress={this.state.progress}/>
                            <Text style={styles.contentText}>Second page</Text>
                        </View>
                    </View>
                        <View style={[this.context.isRotate ? styles.pageStyleIsRotate : styles.pageStyle]}>
                       <View style={styles.content}>
                            <LottieView style={[this.context.isRotate ? styles.ImageIsRotate : styles.image]} source={require('../assets/Images/offline2.json')} progress={this.state.progress}/>
                            <Text style={styles.contentText}>Third page</Text>
                        </View>
                    </View>
                        <View style={[this.context.isRotate ? styles.pageStyleIsRotate : styles.pageStyle]}>
                       <View style={styles.content}>
                            <LottieView style={[this.context.isRotate ? styles.ImageIsRotate : styles.image]} source={require('../assets/Images/offline2.json')} progress={this.state.progress}/>
                            <Text style={styles.contentText}>Fourth page</Text>
                        </View>
                    </View>
                    </Animated.View>    
                </GestureRecognizer>
                <View style={[styles.dots]}>
                       <View style={[styles.dot, {backgroundColor : this.state.case1}]}></View>
                       <View style={[styles.dot, {backgroundColor : this.state.case2}]}></View>
                       <View style={[styles.dot, {backgroundColor : this.state.case3}]}></View>
                       <View style={[styles.dot, {backgroundColor : this.state.case4}]}></View>
                </View>
                <View style={[styles.bottomBarStyle]}>
                    <TouchableOpacity style={[styles.nextBtn]} onPress={() => this.swipeLeft('state')}>
                       <Text style={{color : white}}>{this.state.nextText}</Text>
                    </TouchableOpacity>

                   <>
                   {(this.state.lastPage) ? (
                       <Text></Text>
                   ) : (
                       <TouchableOpacity>
                           <Text style={[styles.skipBtn]}>Skip</Text>
                       </TouchableOpacity>
                   )}
                   </>
                </View>
            </View>
        )
    }
}