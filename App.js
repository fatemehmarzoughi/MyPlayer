import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import realm  from './src/Realm/realmConnection';
import OnBoarding from './src/pages/onBoarding/onBoarding';
import { statusBar, width } from './src/assets/constants/Units';
import ContextProvider from './src/context/contextProvider';
import AppRoute from './src/pages/AppRoute';
import Toast from 'react-native-toast-message';

export default class App extends React.Component {

  componentDidMount(){

    
  //     if(realm.objects("userInstallation")[0] === undefined)
  //     { 
  //       try{
  //         realm.write(() => {
  //           realm.create('userInstallation' , {
  //             isFirstInstallation : 'true',
  //           })
  //         })
  //       }
  //       catch{(err) => console.log(err)}
  //     }

  //     else
  //     {
  //       try{
  //         realm.write(() => {
  //           let object = realm.objects("userInstallation");
  //           object.isFirstInstallation = "false"
  //         })
  //       }
  //       catch{(err) => console.log(err)}
  //     }
  }
  
  constructor(){
    super();
    this.state={
    }
  }

//   <>
//   {(realm.objects("userInstallation")[0] === undefined) ? (
//     <OnBoarding />
//   ) : (
//     <AppRoute />
//   )}
// </>
  
  render (){
    return(
    <ContextProvider>
      {/* <View style={styles.container}> */}
        <StatusBar style="auto" hidden />
        <AppRoute />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      {/* </View> */}
    </ContextProvider>
  );}
}

const styles = StyleSheet.create({
  container: {
    // marginTop : statusBar,
    // flex: 1,
    // width : width,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
