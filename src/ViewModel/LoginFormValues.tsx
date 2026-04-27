export interface LoginData{
    email: string, 
    password:string
}

export interface UserLoginResult{
    id: number
    email:string, 
    accessToken: string,
}