import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cartSlice";
import userInfo from "./userInfo";

const appStore = configureStore({
    reducer : {
        cart : cartSlice,
        user : userInfo
    }
});

export default appStore;

/* inside reducer we have diff slices. as of now we have only cart item, later it could be userLogin details as well


the above reducer is the main reducer for the whole app and it can contain multiple small reducers
where as in cartSlice file,

*/