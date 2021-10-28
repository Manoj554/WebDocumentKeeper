import axiosInstance from "../axios";
import { contactUsConstants } from "./constants"

export const contactUs = (contact) =>{
    return async dispatch => {
        dispatch({type:contactUsConstants.CONTACTUS_REQUEST});

        try {
            const res = await axiosInstance.post('/contactus',contact);

            if(res.status === 200){
                dispatch({
                    type:contactUsConstants.CONTACTUS_SUCCESS,
                    payload:{
                        message:res.data.msg
                    }
                })
            }
        } catch (error) {
            let err = error.response;

            if(err.status === 422){
                dispatch({
                    type:contactUsConstants.CONTACTUS_FAILED,
                    payload:{
                        error:err.data.msg
                    }
                })
            }
            if(err.status === 400){
                dispatch({
                    type:contactUsConstants.CONTACTUS_FAILED,
                    payload:{
                        error:err.data.errors
                    }
                })
            }
        }
    }
}