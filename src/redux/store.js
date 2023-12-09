import { configureStore } from "@reduxjs/toolkit";
import dataSliceReducer from "./slice";




export const store = configureStore({
    reducer: {
        dataSlice: dataSliceReducer
    }
})