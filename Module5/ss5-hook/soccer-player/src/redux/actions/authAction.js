import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
    CLEAR_ERRORS
} from '../types/authTypes';
import axios from "axios";

export const logout = () => ({
    type: LOGOUT
})

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            await dispatch({
                type: LOGIN_REQUEST
            });
            const response = await axios.get(`http://localhost:3001/players?name=${username}&code=${password}`)
            console.log('API Response:', response.data[0]);
            if (response.data[0] != null) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data[0]
                });
            } else dispatch({
                type: LOGIN_FAILURE,
                payload: response.data[0]
            })

        } catch (err) {
            dispatch({
                type: LOGIN_FAILURE,
                payload: err
            });
        }
    }
}