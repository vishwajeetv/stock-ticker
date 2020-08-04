import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


import _ from "lodash";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    greenBackground:{
        backgroundColor:"green"
    },
    redBackGround:{
        backgroundColor:"red"
    },
    defautBackGround:{

    }

}));


export default function Stock(props) {
    const classes = useStyles();

    const getBackGroundColorClass = ()=>{
        if(props.change === "positive"){
            return classes.greenBackground
        }else if(props.change === "negative"){
            return classes.redBackGround
        }else{
            return classes.defautBackGround
        }
    }
    return (
        <React.Fragment>
                    <Paper className={getBackGroundColorClass()}>
                        <CardHeader title={props.stock}></CardHeader>
                        <CardContent><Typography variant={"body2"}> {props.price}</Typography></CardContent>
                        <CardContent><Typography variant={"body2"}> {props.change.toUpperCase()}</Typography></CardContent>
                    </Paper>
        </React.Fragment>
    );
}