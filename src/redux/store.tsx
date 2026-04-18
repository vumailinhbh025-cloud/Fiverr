import { configureStore } from "@reduxjs/toolkit";
import  UseReducer from "./reduces/UserReducer";
import Job from "./reduces/Job";
import SearchFiver from './reduces/SearchFiver'
export const store= configureStore({
    reducer:{
        UseReducer, 
        Job,
        SearchFiver
    }
})

export type RootState= ReturnType<typeof store.getState>
export type Dispatch= typeof store.dispatch