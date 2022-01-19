import React, { useState } from 'react';
import {fontFamily, font, fontColor} from '../css/css.js';
import Button from '@material-ui/core/Button';
import {withCookies} from 'react-cookie';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const ResetPassword = (props) => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false)

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        resetPassword(email);
    };

    const resetPassword = async(email) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',                
                'X-CSRFToken':props.cookies.get('csrftoken'),

            }
        };
        const body = JSON.stringify({ email });
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
    
            setPasswordResetSuccess(true)
        } catch (err) {
        }
    };

    return (
        <div >
            {passwordResetSuccess? 
                <Alert severity="success">
                    we sent an email. Please confirm and verify!
                </Alert>
            :null}

            <div
                style={{
                    fontSize:20,
                    marginBottom:30,
                    textAlign:"center",
                }}
            >
                Please enter your email address.
            </div>
            <form onSubmit={e => onSubmit(e)}>
                <div
                    style={{
                        maxWidth:600,
                        margin:"0 auto",

                    }}
                >
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                        style={{
                            padding:6,
                            width:"100%",
                            display:"block",
                            borderRadius: 4,
                            border: "none",
                            boxShadow: "0 0 0 1px #ccc inset",
                            appearance: "none",
                            "-webkit-appearance": "none",
                            "-moz-appearance": "none",
                            resize:"none",
                            marginBottom:30, 
                            fontFamily:fontFamily.body,
                            fontSize:15,
                            "-webkit-box-sizing": "border-box",
                            boxSizing: "border-box",


    
                        }}
                    />
                    <Button 
                        fullWidth
                        variant="contained" 
                        type="submit"
                        style={{
                            display:"block",
                            marginBottom:30, 
                            fontSize:15,
                            border:"none",
                            backgroundColor:"#11b717",
                            color:"#ffffff",

                        }}

                    >
                        Reset Password
                    </Button>                
                </div>
            </form>
        </div>
    );
};

export default withCookies(ResetPassword);
