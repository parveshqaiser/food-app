import React, {useContext, useEffect, useState } from "react";
import {NEW_HEADER_LOGO_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import userDetails from "../utils/userDetails";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUserInfo, removeUserInfo } from "../utils/userInfo";

const HeaderComponent = ()=>{


    // let name = useContext(userDetails);
    let cartItems = useSelector((store) => store?.cart?.items);
    let loginCredentials = useSelector((store) => store?.user?.loginCredentials);

    let navigate = useNavigate();
    let dispatch = useDispatch();


    function handleClick()
    {
        signOut(authentication).then(() => {
           navigate("/")
        }).catch((error) => {
            console.log(error.message);    
        });
    }

    useEffect(()=>{
        console.log(loginCredentials , "logincreden")
    },[])
    // useEffect(()=>{
    //     onAuthStateChanged(authentication, (user) => {
    //         if (user) {
    //             const userInfo = {
    //                 uid: authentication.currentUser.uid,
    //                 email: authentication.currentUser.email,
    //                 displayName: authentication.currentUser.displayName,
    //             };
    //             dispatch(addUserInfo(userInfo));
    //             navigate('/home');
    //         } else {
    //             dispatch(removeUserInfo());
    //             navigate("/")
    //         }
    //     });
    // },[])

    return(
        <div className="flex justify-between m-1 bg-pink-100 shadow-md">
            <div className="logo-container">
                <img className="w-36 rounded-md" src={NEW_HEADER_LOGO_URL} alt="company logo" />
            </div>
            <div className="nav-items flex items-center">
                <ul className="flex">
                    <li className="px-4"> 
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/about">About</Link>
                    </li>                  
                    <li className="px-4">
                        <Link to="/contact">Contact</Link>
                    </li>

                    <li className="px-4">
                        <Link to="/cart">🛒[{cartItems.length}]</Link>
                    </li>
                    <li className="px-4">
                        <button onClick={handleClick} className="btn-login">Logout</button>
                    </li>
                   
                </ul>
            </div>
        </div>
    )
};

export default HeaderComponent;