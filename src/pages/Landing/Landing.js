import React from "react";
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native';
import {styles} from './styles.js'
import realm  from '../../Realm/realmConnection';
import Context from "../../context/context.js";


export default class Landing extends React.Component{

    static contextType = Context;

    componentDidMount(){
     
        if(realm.objects("userInstallation")[0] === undefined)
        { 
          
          try{
            realm.write(() => {
              realm.create('userInstallation' , {
                isFirstInstallation : 'true',
              })
              this.context.setIsFirstInstallation(true)
            })
            this.setState({
              isFirstInstallation : true,
            })
          }
          catch{(err) => console.log(err)}
        }
  
        else
        {

          try{
            realm.write(() => {
              let object = realm.objects("userInstallation");
              object.isFirstInstallation = "false"
            })
            this.setState({
              isFirstInstallation : false,
            })
          }
          catch{(err) => console.log(err)}
        }
        
    }

    constructor(){
        super();
        this.state={
          isFirstInstallation : true,
        }

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

    render(){ 
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