import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ContextProvider from './src/context/contextProvider';
import AppRoute from './src/pages/AppRoute';
import Toast from 'react-native-toast-message';
import Context from './src/context/context';
import { getData } from './src/LocalStorage/AsyncStorageData';

export default class App extends React.Component {

  static contextType = Context;

  async componentDidMount (){

  }
  
  constructor(){
    super();
    this.state={
      loading : true,
    }
  }
  
  render (){
    return(
       <ContextProvider>
           <StatusBar style="auto" hidden />
           <AppRoute />
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
