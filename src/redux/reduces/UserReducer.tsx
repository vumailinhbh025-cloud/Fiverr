import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RegisterFormValues } from '../../ViewModel/RegisterFormValues';
import type { Dispatch } from '../store';
import { ACCESSTOKEN, getLocalStorage, httpClient, removeCookie, removeStore, saveCookie, saveLocalStorage, USERLOGIN } from '../../util/config';
import { history } from '../../main';
import type { LoginData, UserLoginResult } from '../../ViewModel/LoginFormValues';


let userLoginDefault= getLocalStorage<UserLoginResult>(USERLOGIN)
let accessTokenDefault = getLocalStorage<string>(ACCESSTOKEN)

export interface UserState{
    userLogin: UserLoginResult | null, 
    accessToken: string | null
}

const initialState: UserState = {
    userLogin: userLoginDefault? userLoginDefault : null,
    accessToken: accessTokenDefault ? accessTokenDefault : null
}

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {
    loginAction:(state: UserState, action:PayloadAction<UserLoginResult>)=>{
        state.userLogin= action.payload,
        state.accessToken = action.payload.accessToken;
    }
}});

export const {loginAction} = UserReducer.actions

export default UserReducer.reducer


export const loginActionApi=(userLogin:LoginData)=>{
    return async (dispatch:Dispatch)=>{
        try{
            const res = await httpClient.post(`/api/auth/signin`, userLogin)
            const userResult = res.data.content;
            const payload: UserLoginResult= {
                email: userResult.user?.email,
                accessToken: userResult.token
            }
            const action= loginAction(payload)
            dispatch(action)
            alert("Đăng nhập thành công!");
            history.push('/')
            saveLocalStorage(USERLOGIN,payload.email)
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