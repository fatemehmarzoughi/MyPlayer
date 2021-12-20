import React from "react";
import Context from "./context";
import { SITE_URL } from "assets/constants/General";
import { getData, storeData } from '/LocalStorage/AsyncStorageData'

export default class ContextProvider extends React.Component{

    constructor(){
        super();

        this.state={
            isRotate : false,
            isLogin : false ,
            accessToken : 0,
            isFirstInstallation : false,
            userName : '',
            userCountry : 'Select Your Country',
            userEmail : '',
            userImage : `${SITE_URL}/images/makeURLs/default/png`,
            theme : true, // light = true , dark = false
            isAuthPage : false,
        }
    }

    async componentDidMount(){
        try{
            const theme = await getData('theme');
            console.log('theme is = ' + theme)
            (theme === 'true') ? 
            this.setState({
                theme : true,
            }) : 
            this.setState({
                theme : false
            })
        }catch{(err) => console.log(err)}
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

    setUserImage = (value) => {
        this.setState({
            userImage : value,
        })
    } 

    setTheme = async () => {
        await storeData('theme' , `${this.state.theme}`);
        this.setState({
            theme : !this.state.theme
        })
    }

    setIsAuthPage = (isAuthPage) => {
        this.setState({
            isAuthPage,
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

                 userImage : this.state.userImage,
                 setUserImage : this.setUserImage,

                 theme : this.state.theme,
                 setTheme : this.setTheme,

                 isAuthPage : this.state.isAuthPage,
                 setIsAuthPage : this.setIsAuthPage,
             }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}