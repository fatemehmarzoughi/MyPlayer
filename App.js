import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import realm  from './src/Realm/realmConnection';
import OnBoarding from './src/onBoarding/onBoarding';
import { statusBar, width } from './src/assets/constants/Units';
import ContextProvider from './src/context/contextProvider';

export default class App extends React.Component {

  componentDidMount(){
    
      if(realm.objects("userInstallation")[0] === undefined)
      { 
        try{
          realm.write(() => {
            realm.create('userInstallation' , {
              isFirstInstallation : 'true',
            })
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
        }
        catch{(err) => console.log(err)}
      }
  }
  
  constructor(){
    super();
    this.state={
    }
  }

  // <>
  // {(realm.objects("userInstallation")[0] === undefined) ? (
  //   <OnBoarding />
  // ) : (
  //   <Text>InstallationStatus = {JSON.stringify(realm.objects("userInstallation")[0])}</Text>
  // )}
  // </>
  
  render (){
    return(
    <ContextProvider>
      <View style={styles.container}>
       <OnBoarding />
        <StatusBar style="auto" hidden />
      </View>
    </ContextProvider>
  );}
}

const styles = StyleSheet.create({
  container: {
    // marginTop : statusBar,
    flex: 1,
    // width : width,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
