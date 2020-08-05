import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import _ from "lodash";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import moment from "moment";
import { Sparklines, SparklinesLine } from 'react-sparklines';

moment.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: number=>number + "s ago",
        ss: '%ds ago',
        m: "1m ago",
        mm: "%dm ago",
        h: "1h ago",
        hh: "%dh ago",
        d: "1d ago",
        dd: "%dd ago",
        M: "a month ago",
        MM: "%d months ago",
        y: "a year ago",
        yy: "%d years ago"
    }
});//update locale to change the default "ago" behaviour to show exact seconds.

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    greenBackground:{
        backgroundColor:"lightgreen"
    },
    redBackGround:{
        backgroundColor:"orange"
    },
    defautBackGround:{

    },
    icon:{
        marginBottom:'-5px'
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

    const history = props.histoy;

    return (
        <React.Fragment>
                    <Card className={getBackGroundColorClass()}>
                        <CardHeader
                            title={props.stock}
                            subheader={`Updated ${moment(props.updateTime).fromNow(true)}`}
                        ></CardHeader>
                        <CardContent>
                            <Typography variant={"body2"}>
                                {props.change==='positive' &&
                                    <TrendingUpIcon className={classes.icon}/>
                                }
                                {props.change==='negative' &&
                                    <TrendingDownIcon className={classes.icon}/>
                                }
                                {props.price}</Typography>


                        </CardContent>
                        <Sparklines data={props.histoy} limit={100} width={100} height={20} margin={5}>
                            <SparklinesLine color="blue" width={'1px'} />
                        </Sparklines>
                    </Card>
        </React.Fragment>
    );
}