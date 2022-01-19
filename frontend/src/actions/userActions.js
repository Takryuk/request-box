import axios from 'axios'
import {
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,

} from '../constants/userConstants'

export const loadUser = (cookies)=>async (dispatch)=>{

    dispatch({
        type:USER_LOGIN_REQUEST
    }) 

    const config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization': `JWT ${cookies.get('jwt-access')}`,
            'Accept': 'application/json',               
        },
        // credentials:true
    }

    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`, 
        config,
    ).then(res=>{
        dispatch({
            type:USER_LOAD_SUCCESS,
            payload:res.data,
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
        })
    })
    .catch(err=>{
        dispatch({
            type:USER_LOAD_FAIL,
        })

        dispatch({
            type:USER_LOGIN_FAIL,
        })
    })

};

export const logout = (history, cookies) => async(dispatch) => {
    cookies.remove('jwt-access', {path:'/', domain: "localhost"})
    cookies.remove('jwt-refresh', {path:'/', domain: "localhost"})

    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/logout/`, 
    ).then(res=>{
        cookies.remove('csrftoken', {path:'/', domain: "localhost"})

    })
    .catch(err=>{
    })

    dispatch({ type: USER_LOGOUT })

    history.push({
        pathname:'/',
        state:{
            messages:[
                {
                    severity:"success",
                    message:"ログアウトしました。"
                }
            ]
        }
    })
    
}



export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/register/',
            { 'name': name, 'email': email, 'password': password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const resetPassword = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const resetPasswordConfirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

