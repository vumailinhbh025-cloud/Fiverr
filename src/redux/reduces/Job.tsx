import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Dispatch } from '../store';
import { httpClient } from '../../util/config';
import type { JobModel } from '../../ViewModel/JobModel';
import type { ResponseData } from '../../ViewModel/ResponseData';
import type { JobThueModel } from '../../ViewModel/JobThueModel';


export type JobState={
    arrJob: JobModel[],
    arrJobThue: JobThueModel[]
}
const initialState:JobState = {
    arrJob: [],
    arrJobThue: []
}

const Job = createSlice({
  name: 'Job',
  initialState,
  reducers: {
    setArrayJob:(state: JobState, action: PayloadAction<JobModel[]>)=>{
        state.arrJob= action.payload
    },
    setArrayJobThue:(state:JobState, action:PayloadAction<JobThueModel[]>)=>{
        state.arrJobThue=action.payload
    }
    
  }
});

export const { setArrayJob, setArrayJobThue} = Job.actions

export default Job.reducer


export const getAllJobApiActionThunk=()=>{
    return async (dispatch: Dispatch)=>{
        try{
            const res = await httpClient.get<ResponseData<JobModel[]>>(`/api/cong-viec`)
            dispatch(setArrayJob(res.data.content))
        }catch(err){

        }
    }
}

export const getJobThueApiActionThunk=()=>{
    return async (dispatch:Dispatch)=>{
        try{
            const res = await httpClient.get<ResponseData<JobThueModel[]>>(`/api/thue-cong-viec/lay-danh-sach-da-thue`)
            dispatch(setArrayJobThue(res.data.content))
        }catch(err){

        }
    }
}