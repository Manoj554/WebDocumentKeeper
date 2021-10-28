import axios from "../axios";
import { creatAccountConstants } from "./constants"

export const creatAccount  = (user) =>{
    return async dispatch =>{
        dispatch({type:creatAccountConstants.CREATE_ACCOUNT_REQUEST});

        try {
            const res = await axios.post('/signup',user);
            if(res.status === 200){
                dispatch({
                    type:creatAccountConstants.CREATE_ACCOUNT_SUCCESS,
                    payload:{
                        msg:res.data.msg
                    }
                })
            }
        } catch (error) {
            let res = error.response;
            if(res.status === 400){
                dispatch({
                    type:creatAccountConstants.CREATE_ACCOUNT_FAILED,
                    payload:{
                        error:res.data.errors
                    }
                })
            }
            if(res.status === 422){
                dispatch({
                    type:creatAccountConstants.CREATE_ACCOUNT_FAILED,
                    payload:{
                        error:res.data.msg
                    }
                })
            }
        }
    }
}