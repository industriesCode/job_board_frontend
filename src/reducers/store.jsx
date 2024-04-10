import {configureStore} from "@reduxjs/toolkit";
import  userReducer from "./index";

export default  configureStore({
    reducer: {
        user: userReducer
    }
})