import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { JobDetail } from '../../ViewModel/DetailModel';
import { httpClient } from '../../util/config';
import type { Dispatch } from '../store';
import type { ResponseData } from '../../ViewModel/ResponseData';
import { type thueCongViec, type BinhLuan, type nguoiBinhLuan } from '../../ViewModel/BinhLuanModel';
import { history } from '../../main';


export type JobDetailState = {
  jobDetail: JobDetail | null;
  binhLuanJob: BinhLuan[],
  thueCV: thueCongViec | null,
}

const initialState: JobDetailState = {
  jobDetail: null,
  binhLuanJob: [],
  thueCV: null,

}
const DetailReducer = createSlice({
  name: 'DetailReducer',
  initialState,
  reducers: {
    setJobDetail: (state: JobDetailState, action: PayloadAction<JobDetail>) => {
      state.jobDetail = action.payload
    },
    setBinhLuanJob: (state: JobDetailState, action: PayloadAction<BinhLuan[]>) => {
      state.binhLuanJob = action.payload
    },
    setThueCongViec: (state: JobDetailState, action: PayloadAction<thueCongViec>) => {
      state.thueCV = action.payload
    },
    addComment: (state: JobDetailState, action: PayloadAction<BinhLuan>) => {
      state.binhLuanJob = [action.payload, ...state.binhLuanJob]
    }
  }
});

export const { setJobDetail, setBinhLuanJob, setThueCongViec, addComment } = DetailReducer.actions

export default DetailReducer.reducer

export const getJobDetailActionThunk = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await httpClient.get<ResponseData<JobDetail[]>>(`/api/cong-viec/lay-cong-viec-chi-tiet/${id}`);
      if (res.data.content && res.data.content.length > 0) {
        dispatch(setJobDetail(res.data.content[0]));
      }
    } catch (err) {

    }
  }
}

export const getBinhLuanCongViec = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await httpClient.get<ResponseData<BinhLuan[]>>(`/api/binh-luan/lay-binh-luan-theo-cong-viec/${id}`)
      dispatch(setBinhLuanJob(res.data.content))
    } catch (err) {

    }
  }
}

export const thueJob = (maCongViec: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await httpClient.post<ResponseData<thueCongViec>>(`/api/thue-cong-viec`, {
        maCongViec: maCongViec
      })
      dispatch(setThueCongViec(res.data.content))
      alert(res.data.message)
    } catch (err) {
      alert("Thuê công việc thất bại!")
      history.push('/login')
    }
  }
}

export const postBinhLuan = (data: nguoiBinhLuan, idCongViec: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await httpClient.post<ResponseData<BinhLuan>>(`/api/binh-luan`, data)
      dispatch(addComment(res.data.content))
      alert("Bình luận thành công!")
    } catch (err) {
      alert("Bạn cần đăng nhập");
      history.push("/login");
    }
  }
}