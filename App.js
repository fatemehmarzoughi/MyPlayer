import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ContextProvider from './src/context/contextProvider';
import AppRoute from './src/pages/AppRoute';
import Toast from 'react-native-toast-message';
import { getData, storeData } from './src/LocalStorage/AsyncStorageData';
import SplashScreen from 'react-native-splash-screen'
import LottieView from 'lottie-react-native';


export default class App extends React.Component {

  async componentDidMount (){
    try{
      const isFirstInstallation = await getData('isFirstInstallation');
      // if(isFirstInstallation === null)
      if(isFirstInstallation !== null)
      {
        await storeData('isFirstInstallation' , 'false')
        this.setState({
          isFirstInstallation : true,
          checkingFirstTimeUsers : false
        })
        console.log(`isFirstInstallation in App.js = ${this.state.isFirstInstallation}`)
      }
      else
      {
        this.setState({
          isFirstInstallation : false,
          checkingFirstTimeUsers : false
        })
      }
    }
    catch{(err) => console.log(err)}

  }
  
  constructor(){
    super();
    this.state={
      checkingFirstTimeUsers : true,
      isFirstInstallation : false,
    }
  }
  
  render (){
    if(!this.state.checkingFirstTimeUsers) SplashScreen.hide();
    
    return(
       <ContextProvider>
           <StatusBar style="auto" hidden />
           <>
           {this.state.checkingFirstTimeUsers ? (
             <LottieView loop={true} autoPlay={true} source={require('./src/assets/Images/loading2.json')} />
           ) : (
             <AppRoute isFirstInstallation = {this.state.isFirstInstallation} />
           )}
           </>
           <Toast ref={(ref) => Toast.setRef(ref)} />
       </ContextProvider>

  );}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
