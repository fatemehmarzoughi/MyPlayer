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
             }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}