import { createSlice } from "@reduxjs/toolkit";

let userInfo = createSlice({
    name : "userInfo",
    initialState : {
        loginCredentials : null
    },
    reducers : {
        addUserInfo : ((initialState, action)=>{
            initialState.loginCredentials = action.payload
        }),
        removeUserInfo : ((initialState)=>{
            // return null;
            initialState.loginCredentials =null;
        })  
    }
});


export const {addUserInfo , removeUserInfo} = userInfo.actions;
export default userInfo.reducer;