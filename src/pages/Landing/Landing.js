import React from "react";
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native';
import {styles} from './styles.js'
import Context from "../../context/context.js";
import {getData, storeData} from '../../LocalStorage/AsyncStorageData';

export default class Landing extends React.Component{

    static contextType = Context;

    async componentDidMount(){
     
    }


    constructor(){
        super();
        this.state={
          isFirstInstallation : true,
          startTimer : true,
        }
      }
      
      render(){ 
      if(this.state.startTimer)
      {
        setTimeout(() => {
          if(this.state.isFirstInstallation)
          {
            this.props.navigation.navigate("EnteriesOptions");
          }
          else
          {
            // this.props.navigation.navigate("Home");
            this.props.navigation.navigate("EnteriesOptions");
          }
        }, 6000);
      }
        return(
            <View style={styles.container}>
              <View style={styles.topBox}>
                <LottieView style={styles.loadingIcon} loop={true} autoPlay={true} source={require('../../assets/Images/loading2.json')} />
                <Text style={styles.mainText}>My App</Text>
              </View>
              <Text style={styles.subtitleText}>www.myapp.com</Text>
            </View>
        )
    }
}