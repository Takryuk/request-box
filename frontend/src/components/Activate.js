import React, {useState, useEffect} from 'react'
import {
    Typography,
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const Activate = ({match}) => {

    const [verified, setVerified] = useState(false);

    const verify = async (uid, token) =>{
        const config = {
            headers:{
                'Content-Type': 'application/json',               

            },
        }

        const body = JSON.stringify({uid, token})

        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
            body,
            config,
        )
        .then(res=>{
            setVerified(true)
        })
        .catch(err=>{
        })
    };


    const activate = () =>{
        const uid = match.params.uid;
        const token = match.params.token;
        verify(uid, token)
    }

    useEffect(()=>{
        activate()
    },[])

    
    return (
        <div style={{margin:"0 auto",width:"80%"}}>
            {verified?
                <Alert fullWidth severity="success" style={{marginBottom:30}}>
                    Account was activated!</Alert>
            :
                <Typography>
                    Activating Account. Please wait for a moment...
                </Typography>
            }
            <Link to='/'>Home</Link>
            
        </div>
    )
}

export default Activate
