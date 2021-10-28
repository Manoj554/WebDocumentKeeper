import axios from 'axios';
import { authConstants } from '../actions/constants';
import { api } from '../api';
import store from '../store';

const token = localStorage.getItem('token');

const axiosInstance =  axios.create({
    baseURL:api,
    headers: {
        'Authorization' : token ? `Bearer ${token}`:``
    }
});

axiosInstance.interceptors.request.use((req)=>{
    const { auth } = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
});

axiosInstance.interceptors.response.use((res) => {
    return res;
},(error) => {
    let err = error.response;
    if(err.status === 401){
        localStorage.clear();
        store.dispatch({type:authConstants.LOGOUT_SUCCESS});
    }
    if(err.status === 500){
        console.log(err);
    }
    console.log(err);
    return Promise.reject(error);
})

export default axiosInstance;
