
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name :"Cart",
    initialState : {
        items : []
    },
    reducers : {
        addItem : (initialState,actions)=>{
            // mutating the state means directly modifying
            initialState.items.push(actions.payload)
        },
        removeItem : (state, idx)=>{
            state.items.splice(idx,1)
        },
        clearCart : (initialState)=>{
            initialState.items = [];
            // state.items.length = 0
            // return {items :[]}
        }
    }
});

export const {addItem , removeItem , clearCart} = cartSlice.actions;

export default cartSlice.reducer;

/*
    the above reducer is a combination of all small reducer like addItem, removeItem, cleanItem

*/