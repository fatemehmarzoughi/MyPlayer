import React from "react";
import Context from "./context";

export default class ContextProvider extends React.Component{

    constructor(){
        super();
        this.state={
            isRotate : false,
        }
    }

    setIsRotate = (value) => {
        this.setState({
            isRotate : value,
        })
    }
 
    render(){
        return(
            <Context.Provider
             value = {{
                 isRotate : this.state.isRotate,
                 setIsRotate : this.setIsRotate,
             }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}