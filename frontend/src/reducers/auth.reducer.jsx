import { authConstants, creatAccountConstants, helpingConstants } from '../actions/constants';

const initialstate = {
    token:null,
    userName:'',
    authenticate:false,
    authenticating:false,
    error:null,
    caerror:null,
    message:'',
    success:false,
    logout:false,
    loading:false,
};

const authReducer = (state = initialstate, action) =>{
    console.log(action);
    switch(action.type){

        case helpingConstants.CHANGE_LOGOUT:
            state = {
                ...state,
                logout:false
            }
            break;
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating:true,
                authenticate:false
            }
            break;

        case authConstants.LOGIN_SUCCESS:
            const user = action.payload.user;
            state = {
                ...state,
                authenticating:false,
                error:null,
                authenticate:true,
                token:user.token,
                userName:'',
                message:user.msg
            }
            break;

        case authConstants.LOGIN_FAILED:
            state = {
                ...state,
                authenticating:false,
                authenticate:false,
                logout:false,
                message:'',
                error:action.payload.error
            }
            break;

        case creatAccountConstants.CREATE_ACCOUNT_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;

        case creatAccountConstants.CREATE_ACCOUNT_SUCCESS:
            state = {
                ...state,
                caerror:null,
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
                caerror:action.payload.error
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initialstate,
                authenticate:false,
                logout:true
            }
            break;
        case authConstants.LOGOUT_FAILED:
            state = {
                ...state,
                loading:false
            }
            break;
        default:
            break;
    }
    return state;
}

export default authReducer;