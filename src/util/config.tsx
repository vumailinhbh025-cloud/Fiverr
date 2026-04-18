import axios from "axios"
import { history } from "../main"

export const DOMAIN = `https://fiverrnew.cybersoft.edu.vn`
export const ACCESSTOKEN:string= 'accessToken'
export const USERLOGIN: string = 'userLogin'

export const httpClient=axios.create({
    baseURL:DOMAIN, 
    timeout:30000
})

const saveLocalStorageString=(name:string, value: string):void=>{
    localStorage.setItem(name, value)
}

const getLocalStorageString=(name:string):string | null=>{
    if(localStorage.getItem(name)){
        return localStorage.getItem(name)
    }
    return null
}

const saveLocalStorage=<T,>(name:string, value:T):void=>{
    localStorage.setItem(name, JSON.stringify(value))
}

const getLocalStorage=<T,>(name:string):T | null =>{
    const data = localStorage.getItem(name)
    if(data){
        return JSON.parse(data) as T
    }
    return null
} 

const removeStore=(name:string):void=>{
    localStorage.removeItem(name)
}

const saveCookieString = (name: string, value: string, days: number = 7): void => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const getCookieString = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const saveCookie = <T,>(name: string, value: T, days: number = 7): void => {
    const stringValue = JSON.stringify(value);
    saveCookieString(name, stringValue, days);
}

const getCookie = <T,>(name: string): T | null => {
    const data = getCookieString(name);
    if (data) {
        try {
            return JSON.parse(data) as T;
        } catch (error) {
            console.error("Error parsing cookie:", error);
            return null;
        }
    }
    return null;
}

const removeCookie = (name: string): void => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export{saveLocalStorage, saveLocalStorageString, getLocalStorage, getLocalStorageString, saveCookie, saveCookieString, getCookie, getCookieString, removeCookie, removeStore}

httpClient.interceptors.request.use(config=>{
    config.headers.tokenCybersoft  =`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MSIsIkhldEhhblN0cmluZyI6IjAyLzA5LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4ODMwNzIwMDAwMCIsIm5iZiI6MTc1OTk0MjgwMCwiZXhwIjoxNzg4NDU0ODAwfQ.3f2gLYDZla_lDH4GWmfgSe9Il_QHrpoHIWhW6FSKTi8`
    const accessToken=  getLocalStorage<string>(ACCESSTOKEN)
    if(accessToken){
        config.headers.token= accessToken
    }
    return config
}, error=>{
    return Promise.reject(error)
})

httpClient.interceptors.response.use(response=>{
    return response
}, error =>{
    if(error.response?.status === 400 || error.response?.status === 404){
        alert(error.response.data.content)
        history.push('/login')
    }
})