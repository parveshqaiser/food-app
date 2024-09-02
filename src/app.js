
import React, { Suspense, lazy, useEffect} from "react";
import HeaderComponent from "./components/Header";
import Contact from "./components/Contact";
import FileNotFound from "./components/FileNotFound";
import CartItems from "./components/CartItems";
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";

const  RestaurantMenu = lazy(()=> import("./components/RestaurantMenu"));
const  About = lazy(()=> import("./components/About"));
const  Body = lazy(()=> import("./components/Body"));

import LoginPage from "./components/LoginPage";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "./utils/firebase";
import { addUserInfo, removeUserInfo } from "./utils/userInfo";

const AppLayout = ()=>{

    let dispatch = useDispatch();
    // let navigate = useNavigate();

    useEffect(()=>{
        let subs = onAuthStateChanged(authentication, (user) => {
            if (user) {
                const userInfo = {
                    uid: authentication.currentUser.uid,
                    email: authentication.currentUser.email,
                    displayName: authentication.currentUser.displayName,
                };
                dispatch(addUserInfo(userInfo));
            } else {
                dispatch(removeUserInfo());

            }
        });

        return(()=>{
            subs();
        })
    },[])

    
    let appRoutes = createBrowserRouter([
        {
            path:"/",
            errorElement : <FileNotFound />,
            children :[
                {
                    path :"/",
                    element : (<Suspense>
                        <LoginPage />
                    </Suspense>)
                },
                {
                    path :"/home",
                    element : (<Suspense>
                        <HeaderComponent />
                        <Body />
                    </Suspense>)
                },
                {
                    path :"/about",
                    element : (
                        <Suspense fallback={<h2>Loading...</h2>}> 
                            <HeaderComponent />
                            <About />
                        </Suspense>
                    )
                },
                {
                    path :"/contact",
                    element : (<> <HeaderComponent /><Contact /></>)
                },
                {
                    path :"/cart",
                    element : (<> <HeaderComponent /><CartItems /></>)
                },
                {
                    path : "/rest/:id",
                    element : (
                        <Suspense fallback ={<h1>Loading....</h1>}>
                            <> <HeaderComponent /><RestaurantMenu /></>
                        </Suspense>
                    )
                    
                }
            ]
        }
    ]);
    

    return(
        <RouterProvider router={appRoutes}>
            <Outlet />
        </RouterProvider>
    )
};



export default AppLayout;

// let root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(<AppLayout />);
// root.render(<RouterProvider router={appRoutes} />)
























// let allRouterDefine = createBrowserRouter([
//     {
//         path :"/",
//         element : <AppLayout />,
//         errorElement : <FileNotFound />, // for this page if there is any error , filNotFound comp will catch the error & display it to the user.
//     },
//     {
//         path :"/about",
//         element : <About />,
//     },
//     {
//         path :"/contact",
//         element : <Contact />,
//     }
// ]);