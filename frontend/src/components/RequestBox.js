import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Button, Grid} from '@material-ui/core';
import DisplayImage from '../utils/DisplayImage';
import {fontFamily, fontColor} from '../css/css';
import {withCookies} from 'react-cookie';
import Alert from '@material-ui/lab/Alert';
import {
    Snackbar,
} from '@material-ui/core';


const RequestBox = (props) => {

    const [user, setUser] = useState({});
    const [text, setText] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const uid = props.match.params.uid

    useEffect(()=>{
        fetchUser()
    },[])



    const fetchUser = async()=>{

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
    

        const res = axios.get(
            `${process.env.REACT_APP_API_URL}/users/profile/${uid}`,
            config,
        
        ).then(res=>{
            setUser(res.data)
        }).catch(err=>{
        })

    }

    const handleSubmit = async(event) =>{
        event.preventDefault()
        setDisabled(true)

        const config = {
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken':props.cookies.get('csrftoken'),
            }
        }
        const body = {
            message:text,
            uid:uid,
        }
        const res = axios.post(
            `${process.env.REACT_APP_API_URL}/messages/create`,
            body,
            config,
        
        )
        .then(res=>{

            setShowAlert(true)

        })
        .catch(err=>{
            setDisabled(false)

        })
    }

    const copyUrl =() =>{
        // コピー対象をJavaScript上で変数として定義する
        var copyTarget = document.getElementById("copyUrl");

        // コピー対象のテキストを選択する
        copyTarget.select();

        // 選択しているテキストをクリップボードにコピーする
        document.execCommand("Copy");

        // コピーをお知らせする
        alert("Copied!!  " + copyTarget.value);
    }


    const handleAlertClose = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
        setShowAlert(false)
    }


    if(!user){
        return <div></div>
    }


    return (
        <div
            style={{
                margin:'0 auto',
                maxWidth:600,
            }}
        >

            <div 
                style={{
                    marginBottom:30,
                    fontSize:12,
                    color:"rgba(0, 0, 0, 0.75)",
                }}
            >

                <br/>
                <input  
                    type="hidden"
                    id="copyUrl" 
                    value={`${process.env.REACT_APP_API_URL}/request-box/${props.match.params.uid}`}
                    style={{
                        display:"inline-block",
                        width:458,
                        border:"none",
                        outline: "none",
                    }}
                />
                <Button
                    onClick={copyUrl}
                    type="submit"
                    variant="outlined"
                    style={{
                        fontSize:11,
                        padding:5,
                        display:"inline-block",
                    }}
                >
                    Copy and share this page
                </Button>


            </div>
            <Grid 
                container 
                style={{
                    marginBottom:50,
                }}
            >
                <Grid 
                    item 
                    xs={4}
                    style={{
                        marginRight:30,
                    }}
                >
                    <DisplayImage
                        src={user.image}
                        style={{
                            borderRadius:"50%",
                        }}
                        aspectRatio="1/1"
                    />
                </Grid>
                <Grid container direction="column" item xs={7} spacing={2}>
                    <Grid 
                        item
                        style={{
                            fontSize:30,
                        }}
                    >
                        {user.username}
                    </Grid>
                    <Grid item>
                        {user.profile}
                    </Grid>
                </Grid>
            </Grid>


            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        marginBottom:20,
                        fontSize:20,
                    }}
                >
                    Request(within 300 characters)
                </div>
                <textarea
                
                    // width="100%"  
                    type="text" 
                    value={text} 
                    onChange={e=>setText(e.target.value)}
                    multiple
                    style={{
                        // width:"100%",
                        height: 180,
                        width: "100%",
                        padding: 16,
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
                        
                        // color:"none",
                    }}
                    placeholder="Please write down your request."
                />
                {!disabled?(
                <Button
                    fullWidth
                    type="submit"
                    style={{
                        marginBottom:30, 
                        fontSize:18,
                        border:"none",
                        backgroundColor:"#f27201",
                        color:"#ffffff",
                    }}
                >
                    Submit

                </Button>
                ):(
                    <Button
                    fullWidth
                    disabled={disabled}
                    variant="contained"
                    type="submit"
                    style={{
                        marginBottom:30, 
                        fontSize:18,
                    }}
                >
                    Submit

                </Button>
                )}

            </form>
            <Snackbar open={showAlert}  onClose={handleAlertClose}>
            <Alert variant="filled" onClose={handleAlertClose} severity="success">
                Successfully send your request!
            </Alert>

            </Snackbar>


        </div>
    )
}

export default withCookies(RequestBox);
