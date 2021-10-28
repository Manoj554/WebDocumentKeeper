import { dashboardConstats, helpingConstants } from "../actions/constants"

const initialstate = {
    documents:[],
    loading:false,
    downloading:false,
    deleting:false,
    error:null
}

const dashboardReducer = (state = initialstate, action) =>{
    switch(action.type){
        case dashboardConstats.GET_DOCUMENTS_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case dashboardConstats.GET_DOCUMENTS_SUCCESS:
            state = {
                ...state,
                documents:action.payload.documents,
                loading:false
            }
            break;
        case dashboardConstats.GET_DOCUMENTS_FAILED:
            state = {
                ...state,
                loading:false
            }
            break;
        case dashboardConstats.Add_DOCUMENT_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case dashboardConstats.Add_DOCUMENT_SUCCESS:
            state = {
                ...state,
                error:null,
                documents:action.payload.documents,
                loading:false
            }
            break;
        case dashboardConstats.Add_DOCUMENT_FAILED:
            state = {
                ...state,
                error:action.payload.error,
                loading:false
            }
            break;
        case dashboardConstats.DELETE_DOCUMENT_REQUEST:
            state = {
                ...state,
                deleting:true
            }
            break;
        case dashboardConstats.DELETE_DOCUMENT_SUCCESS:
            state = {
                ...state,
                error:null,
                documents:action.payload.documents,
                deleting:false
            }
            break;
        case dashboardConstats.DELETE_DOCUMENT_FAILED:
            state = {
                ...state,
                error:action.payload.error,
                deleting:false
            }
            break;
        case dashboardConstats.DOWNLOAD_DOCUMENT_REQUEST:
            state = {
                ...state,
                downloading:true

            }
            break;
        case dashboardConstats.DOWNLOAD_DOCUMENT_SUCCESS:
            state = {
                ...state,
                downloading:false
            }
            break;
        case dashboardConstats.DOWNLOAD_DOCUMENT_FAILED:
            state = {
                ...state,
                error:action.payload.error,
                downloading:false
            }
            break;
        case helpingConstants.CLEAR_MODAL_ERROR:
            state = {
                ...state,
                error:null
            }
            break;
        default:
            break;
    }
    return state;
}

export default dashboardReducer;