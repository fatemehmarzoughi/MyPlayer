import React from "react";
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native'
import { styles } from "./style";
import LottieView from 'lottie-react-native';
import {changeBackgroundColor} from 'components/lightDarkTheme'
import Animated , { BounceIn , AnimatedLayout} from 'react-native-reanimated'; 


export default class FlatList1 extends React.Component{

    constructor(){
        super();
        this.state = {
            loadingData : [
                {
                    id : 0
                },
                {
                    id : 1
                },
                {
                    id : 2
                },
            ]
        }
    }

    render(){
        return(
            <>
            {this.props.loading ? (
                <View style={styles.row}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <FlatList 
                     horizontal
                     data={this.state.loadingData}
                     style={styles.flatlist}
                     keyExtractor={(item , index) => index.toString()}
                     renderItem={({item}) => (
                         <TouchableOpacity style={[styles.Image , changeBackgroundColor(this.props.theme)]}>
                             <LottieView autoPlay={true} loop={true} source={require('../../../assets/Images/loading2.json')} />
                         </TouchableOpacity>
                      )}
                    />
                </View>
            ) : (
                <View style={styles.row}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <FlatList 
                     horizontal
                     data={this.props.data}
                     style={styles.flatlist}
                     keyExtractor={(item , index) => index.toString()}
                     renderItem={({item}) => (
                         <TouchableOpacity onPress={() => this.props.func(item.imageURL)}>
                            <Animated.View entering={BounceIn.duration(500).delay(300)}>
                                <Image style={[styles.Image , changeBackgroundColor(this.props.theme)]} source={{uri : item.imageURL}} />
                            </Animated.View>
                         </TouchableOpacity>
                      )}
                    />
                </View>
            )}
            </>
        )
    }
}