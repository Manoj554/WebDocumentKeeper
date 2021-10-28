import { creatAccountConstants } from '../actions/constants';

const initialState = {
    success:false,
    loading:false,
    error:null,
    message:''
}

export const createAccountReducer = (state = initialState, action) =>{
    switch(action.type){
        case creatAccountConstants.CREATE_ACCOUNT_REQUEST:
            state = {
                initialState,
                loading:true
            }
            break;
        case creatAccountConstants.CREATE_ACCOUNT_SUCCESS:
            state = {
                ...state,
                error:null,
                message:action.payload.msg,
                loading:false,
                success:true
            }
            break;
        case creatAccountConstants.CREATE_ACCOUNT_FAILED:
            
            state = {
                ...state,
                loading:false,
                message:'',
                error:action.payload.error
            }
            break;
        default:
            break;
    }

    return state;
}