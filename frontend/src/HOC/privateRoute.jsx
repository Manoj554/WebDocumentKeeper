import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getDocuments, isUserLoggedIn } from '../actions';
import { helpingConstants } from '../actions/constants';

const PrivateRoute = ({component:Component, ...rest}) => {
    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth);

    useEffect(()=>{
        if(!auth.authenticate && !auth.logout){
            dispatch(isUserLoggedIn(true));
        }else{
            dispatch({type:helpingConstants.CHANGE_LOGOUT});
        }
        if(auth.authenticate){
            dispatch(getDocuments());
        }
    }, [dispatch,auth.authenticate,auth.logout]);

    return <Route {...rest} component={(props) =>{
            const token = window.localStorage.getItem('token');
            if(token){
                return <Component {...props}/>
            }else{
                return <Redirect to="/signin" />
            }
        }} />

}

export default PrivateRoute;
