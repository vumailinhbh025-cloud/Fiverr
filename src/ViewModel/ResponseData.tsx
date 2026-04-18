export interface ResponseData<T>{
    success: boolean;
    statusCode: number;
    message:    string;
    content:    T;
    dateTime:   string;
}