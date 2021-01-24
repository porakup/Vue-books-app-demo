import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import store from '../store/index';

const service = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes",
    timeout: 60000
  });

const interceptRequest = (request: AxiosRequestConfig) => {return request}  
const interceptRequestError = (error: any) => { return Promise.reject(error.response)}  
const interceptResponse = (response: AxiosResponse<any>): Promise<AxiosResponse<any>> => {return Promise.resolve(response)}  
const interceptResponseError = (error: any): Promise<any> => {return Promise.reject(error.response)}  

service.interceptors.request.use(interceptRequest, interceptRequestError)
service.interceptors.response.use(interceptResponse, interceptResponseError)  

export class BaseService {

    async get(url: string, params: any = {}) {
            return new Promise((resolve, reject) => {
                    store.dispatch("addRequestAction");
                    service.get(url, params).then(resp => {
                    const { data } = resp || {}
                    return resolve(data || { callSuccess: true })
                }).catch(err => {
                    store.dispatch("requestDoneAction");
                    const { data:{ error: { message } } } = err;
                    store.dispatch("setErrorMessageAction", message); 
                    return reject({errMessage: message})
                })
            }
        )
    }

}