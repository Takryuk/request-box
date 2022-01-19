import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MerchandiseList from './MerchandiseList';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import {fontFamily, fontColor} from '../css/css';
import {withCookies} from 'react-cookie';


const Home = (props) => {
    const [merchandises, setMerchandises] = useState([])
    const [nextPageNumber, setNextPageNumber] = useState(1)

    useEffect(() => {
        fetchMerchandises(1)
    }, [])    


    const fetchMerchandises = async(nextPageNumber) => {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization':`JWT ${props.cookies.get('jwt-access')}`,
            }
        }
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/messages/list?page=${nextPageNumber}`,
            config,
        )
        .then(res=>{
            setMerchandises([...merchandises, ...res.data.results])
            setNextPageNumber(nextPageNumber+1)

        })
        .catch(err=>{
    
        })    
    }

    const handleMoreMerchandises = async =>{
        fetchMerchandises(nextPageNumber)
    }

    return (
        <div
            style={{
                margin:'0 auto',
                maxWidth:600,
            }}
        >
            <div
            >
                <Typography
                    style={{
                        fontFamily:fontFamily.body,
                        color:fontColor.body,
                        marginBottom:30, 
                        fontSize:20,
                    }}
                >
                    Requests
                </Typography>

            </div>
            <div
                style={{
                    marginBottom:30
                }}
            >

                <MerchandiseList merchandises={merchandises}/>
            </div>

            <Button 
                fullWidth
                variant="outlined"
                onClick={handleMoreMerchandises}
                style={{
                    fontFamily:fontFamily.body,
                    color:"#ffffff",
                    marginBottom:30, 
                    fontSize:18,
                    border:"none",
                    backgroundColor:"#f27201",
                }}
            >
                More
            </Button>    
        </div>
    )
}

export default withCookies(Home)
