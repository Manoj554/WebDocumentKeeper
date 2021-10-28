import axios from "../axios";
import { authConstants } from "./constants";

export const login = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });

        try {
            const res = await axios.post('/signin', user);
            if (res.status === 200) {

                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        user: res.data
                    }
                })
            }
        } catch (error) {
            let res = error.response;
            // console.log(error);

            if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILED,
                    payload: {
                        error: res.data.errors
                    }
                })
            }
            if (res.status === 422) {
                dispatch({
                    type: authConstants.LOGIN_FAILED,
                    payload: {
                        error: res.data.msg
                    }
                })
            }
        }
    }
}

export const isUserLoggedIn = (val) => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if (token) {
            // const fullName = JSON.parse(localStorage.getItem('user'));
            const user = {token}

            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    user: user 
                }
            });
        } else {
            if (val) {
                dispatch({
                    type: authConstants.LOGIN_FAILED,
                    payload: {
                        error: "Login Required!"
                    }
                });
            } else {
                dispatch({
                    type: authConstants.LOGIN_FAILED,
                    payload: {
                        error: null
                    }
                });
            }
        }
    }
}

export const signout = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        try {
            const res = await axios.get('/signout');

            if (res.status === 200) {
                const token = localStorage.getItem('token');
                if (token) {
                    localStorage.clear();
                    dispatch({
                        type: authConstants.LOGOUT_SUCCESS,
                        payload: {
                            error: null
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }

    }
}