const { contactUsConstants } = require("../actions/constants")

const initialstate = {
    message:'',
    loading:false,
    error:null
}

const contactReducer = (state = initialstate, action) => {

    switch(action.type){

        case contactUsConstants.CONTACTUS_REQUEST :
            state = {
                ...state,
                loading:true,
            }
            break;
        case contactUsConstants.CONTACTUS_SUCCESS:
            state = {
                ...state,
                error:null,
                message:action.payload.message,
                loading:false
            }
            break;
        case contactUsConstants.CONTACTUS_FAILED :
            state = {
                ...state,
                message:'',
                error:action.payload.error,
                loading:false
            }
            break;
        default:
            break;
    }
    return state;
}

export default contactReducer;