import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {fontFamily, fontColor} from '../css/css';
import CreateMultiline from '../utils/CreateMultiline';

const useStyles = makeStyles({
    root: {
      maxWidth: 140,
    },
    media: {
      height: 140,
    },
});


const Merchandise = ({merchandise}) => {
    const history = useHistory()
    // const goToDetail = () =>{
    //     history.push({
    //       pathname:  `/detail/${merchandise.id}`,
    //    })
    // }
    
    // const goToEdit = (event) =>{
    //     event.stopPropagation()
    //     history.push({
    //         pathname:  `/update/${merchandise.id}`,
    //      })  
    // }
  
    const classes = useStyles()
    return (
        <div>
            <div 
                style={{
                    fontFamily:fontFamily.body,
                    border: "1px solid rgba(146, 146, 146, 0.55)",
                    borderRadius: 8,
                    padding:10,
                    color:fontColor.body,
                    // boxShadow:"2px 2px 5px 0px rgba(0, 0, 0, .3)",
                }}
            >
                <div
                    style={{
                        marginBottom:10, 
                        fontSize:11,
                    }}
                >
                    {merchandise.created_at}
                </div>

                <div
                    style={{
                        fontSize:18,
                    }}
                >
                    {CreateMultiline(merchandise.message)}
                </div>
            </div> 
        </div>
)
}

export default Merchandise
