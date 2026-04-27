import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Dispatch } from '../store';
import type { ResponseData } from '../../ViewModel/ResponseData';
import type {MenuJobItem} from '../../ViewModel/MenuJob';
import { httpClient } from '../../util/config';

export type MenuJobState={
    arrMenu:MenuJobItem[],
}

const initialState:MenuJobState = {
    arrMenu:[],
    
}

const MenuJobReducer = createSlice({
  name: 'MenuJobReducer',
  initialState,
  reducers: {
    setMenuAction:(state:MenuJobState, action:PayloadAction<MenuJobItem[]>)=>{
        state.arrMenu= action.payload
    }
  }
});

export const {setMenuAction} = MenuJobReducer.actions

export default MenuJobReducer.reducer


export const getMenuJobApiActionThunk=()=>{
    return async (dispatch:Dispatch)=>{
        try{
            const res= await httpClient.get<ResponseData<MenuJobItem[]>>(`/api/cong-viec/lay-menu-loai-cong-viec`)
            console.log("Data từ API:", res.data.content);
            dispatch(setMenuAction(res.data.content))
        }catch(err){

        }
    }
}
