import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SearchModel } from '../../ViewModel/SearchModel';
import type { Dispatch} from '../store';
import { httpClient } from '../../util/config';
import type { ResponseData } from '../../ViewModel/ResponseData';

export type SearchState={
  arrSearchFiver: SearchModel[]
}

const initialState:SearchState = {
  arrSearchFiver:[]
}

const SearchFiver = createSlice({
  name: 'SearchFiver',
  initialState,
  reducers: {
    setArraySearch:(state:SearchState, action:PayloadAction<SearchModel[]>)=>{
        state.arrSearchFiver=action.payload
    }
  }
});

export const { setArraySearch} = SearchFiver.actions

export default SearchFiver.reducer

export const getAllJobSearch= (tenCongViec:string| undefined)=>{
  return async(dispatch:Dispatch)=>{
    try{
      const res= await httpClient.get<ResponseData<SearchModel[]>>(`/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${tenCongViec}`)
      dispatch(setArraySearch(res.data.content))
    }catch(err){

    }
  }
}