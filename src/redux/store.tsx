import { configureStore } from "@reduxjs/toolkit";
import  UserReducer from "./reduces/UserReducer";
import Job from "./reduces/Job";
import SearchFiver from './reduces/SearchFiver'
import MenuJobReducer from './reduces/MenuJobReducer'
import DetailReducer from './reduces/DetailReducer'
export const store= configureStore({
    reducer:{
        UserReducer, 
        Job,
        SearchFiver, 
        MenuJobReducer, 
        DetailReducer,
    }
})

export type RootState= ReturnType<typeof store.getState>
export type Dispatch= typeof store.dispatch