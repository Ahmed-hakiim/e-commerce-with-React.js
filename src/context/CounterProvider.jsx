import React, { useEffect } from 'react'
import { useState } from 'react'
import { CounterContext } from './CounterContext'
import axios from 'axios';

export default function CounterProvider(props) {

    let [count, setCount] = useState(0);
    let increase = () => {
        setCount(count + 1);
    }
    let decrease = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    // let handleSubmit = (e) => {
    //     // console.log(e.target)
    //     const { name, value } = e.target;
    //     setCartItems((old) => ({
    //         //? computed property 
    //         ...old,
    //         [name]: value
    //     }))
    // }


    let createCartItem = async (data) => {
        await axios.post("http://localhost:3000/cartProoducts", data);
        increase();

    }



    let myValue = {
        count,
        increase,
        decrease,
        createCartItem,
        // handleSubmit,
        // cartItems
    };
    return (

        <CounterContext.Provider value={myValue}>
            {props.children}
        </CounterContext.Provider>

    )
}
