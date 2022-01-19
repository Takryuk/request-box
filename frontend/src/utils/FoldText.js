import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import createMultiline from './CreateMultiline';


const FoldText = (props) => {




    const useStyles = makeStyles((theme) => ({
        sentence:{
            wordWrap:"break-word",
            textOverflow:"ellipsis",
            display:"-webkit-box", 
            overflow: 'hidden',
            WebkitBoxOrient:"vertical",
        }
    }));

    const classes = useStyles()

    
    return (
        <Typography
            {...props}
            className={classes.sentence}
        >
            {createMultiline(props.text)}
        </Typography>
    )
}

export default FoldText
