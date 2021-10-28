import { dashboardConstats } from "./constants";
import axios from '../axios';
import FileSaver from 'file-saver';

export const getDocuments = () => {

    return async dispatch => {

        dispatch({ type: dashboardConstats.GET_DOCUMENTS_REQUEST });

        try {
            const res = await axios.get('/getdocuments');
            if (res.status === 200) {
                dispatch({
                    type: dashboardConstats.GET_DOCUMENTS_SUCCESS,
                    payload: {
                        documents: res.data.documents
                    }
                })
            }
        } catch (error) {
            let res = error.response;
            if (res.status === 401) {

                dispatch({
                    type: dashboardConstats.GET_DOCUMENTS_FAILED,
                    payload: {
                        error: res.data.msg
                    }
                })
            }
        }
    }
}

export const addDocument = (form) => {
    return async dispatch => {
        dispatch({ type: dashboardConstats.Add_DOCUMENT_REQUEST });

        try {
            const res = await axios.post('/adddocument', form);

            if (res.status === 200) {
                dispatch({
                    type: dashboardConstats.Add_DOCUMENT_SUCCESS,
                    payload: {
                        documents: res.data.documents
                    }
                })
            }
        } catch (error) {
            let res = error.response;

            if (res.status === 400 || res.status === 500) {
                dispatch({
                    type: dashboardConstats.Add_DOCUMENT_FAILED,
                    payload: {
                        error: res.data.msg
                    }
                })
            }
        }
    }
}

export const deleteDocument = (id) => {
    return async dispatch => {
        dispatch({ type: dashboardConstats.DELETE_DOCUMENT_REQUEST });

        try {
            const res = await axios.post('/deletedocument', { id });

            if (res.status === 200) {
                dispatch({
                    type: dashboardConstats.DELETE_DOCUMENT_SUCCESS,
                    payload: {
                        documents: res.data.documents
                    }
                })
            }
        } catch (error) {
            let res = error.response;

            if (res.status === 500) {
                dispatch({
                    type: dashboardConstats.DELETE_DOCUMENT_FAILED,
                    payload: {
                        error: res.data.msg
                    }
                })
            }
        }
    }
}


export const downloadThis = (Id) => {
    return async dispatch => {
        dispatch({ type: dashboardConstats.DOWNLOAD_DOCUMENT_REQUEST });

        try {
            const res = await axios.post('/download', {Id});
            const { docurl,docName } = res.data.document;
            if (res.status === 200) {
                FileSaver.saveAs(docurl, docName);
                dispatch({
                    type:dashboardConstats.DOWNLOAD_DOCUMENT_SUCCESS,
                    payload:{
                        message:res.data.msg
                    }
                });
            }
        }catch(error){
            let err = error.response;

            if(err.status === 500){
                dispatch({
                    type:dashboardConstats.DOWNLOAD_DOCUMENT_FAILED,
                    payload:err.data
                });
            }
        }
    }
}