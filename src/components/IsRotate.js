import React, { useEffect, useState, useContext } from "react";
import { Text , Dimensions} from "react-native";
import Context from "../context/context";

export default function IsRotate(){

    const context = useContext(Context);

    useEffect(()=> {
        Dimensions.addEventListener('change' , ({window : {width , height}})=> {
            if(width > height)
            {
                context.changeIsRotateToTrue();
                console.log('is rotate ')
            }
            else 
            {
                context.changeIsRotateToFalse();
            }
        })
    }, [])

    return isRotate;
}