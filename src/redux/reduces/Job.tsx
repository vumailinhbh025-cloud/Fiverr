import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Dispatch } from '../store';
import { httpClient } from '../../util/config';
import type { JobModel } from '../../ViewModel/JobModel';
import type { ResponseData } from '../../ViewModel/ResponseData';


export type JobState={
    arrJob: JobModel[]
}
const initialState:JobState = {
    arrJob: []
}

const Job = createSlice({
  name: 'Job',
  initialState,
  reducers: {
    setArrayJob:(state: JobState, action: PayloadAction<JobModel[]>)=>{
        state.arrJob= action.payload
    }
  }
});

export const { setArrayJob} = Job.actions

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