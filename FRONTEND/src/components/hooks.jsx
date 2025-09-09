import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";


const Hooks = () => {
    const [data , setData]=useState("");

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/comments")
        .then((response)=>{
            console.log("Api was called")
            setData("Api was called");
        });
    },[]);


    return (
        <div>
           {data}
        </div>
    )
}

export default Hooks;