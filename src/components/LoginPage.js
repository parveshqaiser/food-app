
import React, { useRef, useState } from 'react'
// import food3 from "../../Images/food3.jpg";
import back4 from "../../Images/back4.jpg"; 
import { authentication } from '../utils/firebase';
import {createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile} from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserInfo } from '../utils/userInfo';

const LoginPage = () => {

    const [isLogin, setIsLogin] = useState(false); // means user not login in , first time user is false

    const [message, setMessage] = useState("");
    const [inputValues , setInputValues] = useState({username : "", email :"", password :""})
  
    let dispatch = useDispatch();
    let navigate = useNavigate();

    function handleSignInSignUp()
    {
        setInputValues({username :"", email :"", password :""})
        setIsLogin(!isLogin);       
    }

    console.log(inputValues.email)

    function handleChange(e)
    {
        let name = e.target.name;
        let value = e.target.value;

        setInputValues({...inputValues , [name] : value});
    }
    async function handleClick()
    {
        let {username , email,password} = inputValues;


        if(isLogin == false)
        {
            if(!username || !email || !password )
            {
                setTimeout(()=>{
                    setMessage("");
                },2000)
                setMessage("Enter all Values");
                return;
            }

            try{
                let res = await createUserWithEmailAndPassword(authentication, inputValues.email , inputValues.password);
                // console.log(res.user);

                if(res?.user?.accessToken)
                {
                    setIsLogin(true); // 
                    // dispatch(addUserInfo(res.user));
                    setMessage("Registered Successfully");
                    setTimeout(() => {
                        setMessage("");
                    }, 2000);
                }
            }  
            catch(err)
            {
                console.log(err);
                setMessage("User Already Exist");
            }
        }
        else {

            if(!email || !password )
            {
                setTimeout(()=>{
                    setMessage("");
                },2000)
                setMessage("Enter all Values");
                return;
            }
           
            try{
                let res = await signInWithEmailAndPassword(authentication,inputValues.email , inputValues.password);
                // console.log(res.user);
                if(res?.user?.accessToken)
                {
                    updateProfile(res.user, {
                        displayName: "User",
                    }).then(()=>{
                        const userInfo = {
                            uid: authentication.currentUser.uid,
                            email: authentication.currentUser.email,
                            displayName: authentication.currentUser.displayName,
                        };
                        dispatch(addUserInfo(userInfo))
                    })
                    navigate("/home");
                }
            }  
            catch(err){
                console.log(err);
                setMessage(err.message)
            }
        }
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${back4})` }}>
        <div className="backdrop-filter backdrop-blur bg-transparent py-8 px-6 rounded-lg w-full max-w-md">
            <h2 className="text-center font-bold text-3xl mb-3 text-white">
                {isLogin ? "Login" : "Sign Up" }
            </h2>
            <form onSubmit={(e)=> e.preventDefault()}>
                {
                !isLogin && (
                    <div className="mb-4">
                        <input
                            type="text"
                            // ref={username}
                            onChange={handleChange}
                            name="username"
                            value={inputValues.username}
                            className="w-full bg-transparent 
                            my-2 pt-3 pr-11 pb-3 pl-5 
                            rounded-3xl focus:outline-none 
                            border-2 text-white placeholder-current"
                            placeholder="Username"
                        />
                    </div>
                    )
                }               
                <div className="mb-4">
                    <input
                        // ref={emailValue}
                        type="text"
                        name='email'
                        value={inputValues.email}
                        onChange={handleChange}
                        className="w-full bg-transparent 
                        my-2 pt-3 pr-11 pb-3 pl-5 
                        rounded-3xl focus:outline-none 
                        border-2 text-white placeholder-current"
                        placeholder="Email Address"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        value={inputValues.password}
                        onChange={handleChange}
                        className="w-full bg-transparent 
                        my-2 pt-3 pr-11 pb-3 pl-5 
                        rounded-3xl focus:outline-none 
                        border-2 text-white placeholder-current"
                        placeholder="Password"
                    />
                </div>
                <div className='flex justify-between mb-5'>
                    <label className='text-white'>
                        <input type='checkbox' className='mr-2' />Remember Me
                    </label>
                    <a href='#'  className="text-white font-bold">Forgot Password</a>
                </div>
                <button 
                    className='bg-orange-300 w-full cursor-pointer h-11 font-bold rounded-3xl hover:bg-orange-500' 
                    onClick={handleClick}>
                    {isLogin ? "Login" : "Sign Up" }
                </button>
                <p className='text-center font-extrabold text-black'>{message}</p>
            </form>
            <p className="mt-4 text-center text-lg text-white">
                {isLogin ? " Don't have an account?" : "Existing User ?" } 
                <span onClick={handleSignInSignUp} className="text-white hover:underline font-bold hover:cursor-pointer">{isLogin ? "Register" : "Log In"}</span>
            </p>
        </div>
    </div>
    );
}

export default LoginPage;
