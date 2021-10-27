import React from "react";
import Context from "./context";
import realm from "../Realm/realmConnection";

export default class ContextProvider extends React.Component{

    constructor(){
        super();
        this.state={
            isRotate : false,
            isLogin : (realm.objects('Authentication')[0] === undefined) ? false : true,
            // isLogin : false,
            accessToken : 0,
            isFirstInstallation : false,

            userName : '',
            userCountry : '',
            userEmail : ''
        }
    }

    setIsRotate = (value) => {
        this.setState({
            isRotate : value,
        })
    }

    setIsLogin = (value) => {
        this.setState({
            isLogin : value,
        })
    } 

    setAccessToken = (value) => {
        this.setState({
            accessToken : value,
        })
    }

    setIsFirstInstallation = (value) => {
        this.setState({
            isFirstInstallation : value,
        })
    }

    setUserEmail = (value) => {
        this.setState({
            userEmail : value,
        })
    }
    setUserCountry = (value) => {
        this.setState({
            userCountry : value,
        })
    }
    setUserName = (value) => {
        this.setState({
            userName : value,
        })
    }
 
    render(){
        return(
            <Context.Provider
             value = {{
                 isRotate : this.state.isRotate,
                 setIsRotate : this.setIsRotate,

                 isLogin : this.state.isLogin,
                 setIsLogin : this.setIsLogin,

                 accessToken : this.state.accessToken,
                 setAccessToken : this.setAccessToken,

                 isFirstInstallation : this.state.isFirstInstallation,
                 setIsFirstInstallation : this.setIsFirstInstallation,

                 userName : this.state.userName,
                 setUserName : this.setUserName,

                 userEmail : this.state.userEmail,
                 setUserEmail : this.setUserEmail,

                 userCountry : this.state.userCountry,
                 setUserCountry : this.setUserCountry,
             }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}