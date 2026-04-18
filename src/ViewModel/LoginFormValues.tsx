export interface LoginData{
    email: string, 
    password:string
}

export interface UserLoginResult{
    email:string, 
    accessToken: string,
}