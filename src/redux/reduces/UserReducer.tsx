import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RegisterFormValues } from '../../ViewModel/RegisterFormValues';
import type { Dispatch } from '../store';
import { ACCESSTOKEN, getLocalStorage, httpClient, removeCookie, removeStore, saveCookie, saveLocalStorage, USERLOGIN } from '../../util/config';
import { history } from '../../main';
import type { LoginData, UserLoginResult } from '../../ViewModel/LoginFormValues';
import type { ResponseData } from '../../ViewModel/ResponseData';
import type { UserProfile } from '../../ViewModel/ProfileModel';
import type { UpdateThongTinValues } from '../../ViewModel/UpdateThongTinValues';


let userLoginDefault= getLocalStorage<UserLoginResult>(USERLOGIN)
let accessTokenDefault = getLocalStorage<string>(ACCESSTOKEN)

export interface UserState{
    userLogin: UserLoginResult | null, 
    accessToken: string | null,
    userProfile: UserProfile | null,
    updateProfile: UpdateThongTinValues | null 
}

const initialState: UserState = {
    userLogin: userLoginDefault? userLoginDefault : null,
    accessToken: accessTokenDefault ? accessTokenDefault : null,
    userProfile:null, 
    updateProfile: null
}

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {
    loginAction:(state: UserState, action:PayloadAction<UserLoginResult>)=>{
        state.userLogin= action.payload,
        state.accessToken = action.payload.accessToken;
    },
    getProfileAction:(state:UserState,action:PayloadAction<UserProfile> )=>{
        state.userProfile= action.payload
    }, 
    setUpdateProfile:(state:UserState, action:PayloadAction<UpdateThongTinValues>)=>{
        state.updateProfile=action.payload
    }
}});

export const {loginAction, getProfileAction, setUpdateProfile} = UserReducer.actions

export default UserReducer.reducer


export const loginActionApi=(userLogin:LoginData)=>{
    return async (dispatch:Dispatch)=>{
        try{
            const res = await httpClient.post(`/api/auth/signin`, userLogin)
            const userResult = res.data.content;
            const payload: UserLoginResult= {
                id: userResult.user?.id,
                email: userResult.user?.email,
                accessToken: userResult.token
            }
            const action= loginAction(payload)
            dispatch(action)
            alert("Đăng nhập thành công!");
            history.push('/danhSachCongViec')
            saveLocalStorage(USERLOGIN,payload)
            saveLocalStorage(ACCESSTOKEN, payload.accessToken)
            saveCookie(USERLOGIN, payload.email)
            saveCookie(ACCESSTOKEN, payload.accessToken)
        }catch(err: any){
            removeStore(USERLOGIN)
            removeStore(ACCESSTOKEN)
            removeCookie(USERLOGIN)
            removeCookie(ACCESSTOKEN)
            alert(err.response?.data?.message || "Email hoặc mật khẩu không đúng!")
        }
    }
}


export const registerActionApi=(userRegister:RegisterFormValues)=>{
    return async(dispatch:Dispatch)=>{
        try{
            const { confirmPassword, ...dataRegister } = userRegister;
            const res= await httpClient.post('/api/auth/signup', dataRegister)
            alert(res.data?.message || "Đăng ký thành công! Hãy đăng nhập để tiếp tục.")
            history.push('/login')
        }catch(error:any){
            alert(error.response?.data?.message || "Đăng ký thất bại")
        }
    }

}

export const getProfileApiActionThunk=(id:number)=>{
    return async (dispatch: Dispatch)=>{
        try{
            const res= await httpClient.get<ResponseData<UserProfile>>(`/api/users/${id}`)
            dispatch(getProfileAction(res.data.content))
        }catch(err){

        }
    }
}

export const putUpdateProfileActionThunk=(payload: UpdateThongTinValues)=>{
    return async (dispatch:Dispatch)=>{
        try{
            const res= await httpClient.put<ResponseData<UpdateThongTinValues>>(`/api/users/${payload.id}`,payload);
            dispatch(setUpdateProfile(res.data.content));
            alert("Cập nhật thành công!");
            dispatch(getProfileApiActionThunk(payload.id));
        }catch(err){
            alert("Cập nhật thất bại!");
        }
    }
}
