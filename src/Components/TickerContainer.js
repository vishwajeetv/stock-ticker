import React, {useEffect, useState, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


import _ from "lodash";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Stock from "./Stock";
const wsClient = new W3CWebSocket('ws://stocks.mnet.website');

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));


export default function TickerContainer() {
    const classes = useStyles();

    const ws = useRef(null);

    const [stockPrices, setStockPrices] = useState( []);

    const handleChange = (event, newValue) => {
        // setValue(newValue);
    };

    useEffect(() => {
        ws.current = new WebSocket('ws://stocks.mnet.website');
        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        return () => {
            ws.current.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = (message) => {

            let updatedStockPrices = JSON.parse(message.data);

            let oldStockPrices = stockPrices;

            // _.forEach(updatedStockPrices, (updatedStockPrice)=>{
            //     console.log(updatedStockPrice[0].toString());
            //     console.log(updatedStockPrice[1]);
            //     oldStockPrices[updatedStockPrice[0].toString()] = updatedStockPrice[1];
            // })

                _.forEach(updatedStockPrices, (updatedStockPrice,index)=>{

                        let mathcedFlag = false;



                        _.forEach(oldStockPrices, (oldStock, oldStockIndex)=>{

                            let updatedStockName = updatedStockPrice[0];
                            let updatedStockValue = updatedStockPrice[1];

                            if(updatedStockName===Object.keys(oldStock)[0]){
                                mathcedFlag = true;

                                let oldStockValue = oldStock[updatedStockName].value;

                                let newValue = JSON.parse(JSON.stringify(oldStockValue));//clone

                                // newValue.values = [];
                                if(!newValue){
                                    newValue = {};
                                }
                                if(!newValue.values){
                                    newValue.values = [];
                                }
                                newValue.values.push(updatedStockValue);


                                let previousOldStockValue = oldStockValue.values[oldStockValue.values.length - 1];

                                if((previousOldStockValue  - updatedStockValue) > 0){
                                    newValue.change = "negative";
                                }else if((previousOldStockValue  - updatedStockValue) < 0){
                                    newValue.change = "positive";
                                }else{
                                    newValue.change = "nochange";
                                }
                                newValue.updateTime = new Date();
                                oldStockPrices[oldStockIndex][updatedStockName].value = newValue;

                            }
                        })
                        if(!mathcedFlag){

                            let updatedStockName = updatedStockPrice[0];
                            let updatedStockValue = updatedStockPrice[1];

                            let stockToAdd = {};
                            stockToAdd[updatedStockName] = {};

                            let newValue = {};
                            newValue.values =  [updatedStockValue];
                            newValue.change = "nochange";

                            newValue.updateTime = new Date();

                            stockToAdd[updatedStockName].value = newValue;

                            oldStockPrices.push(stockToAdd);
                        }


                })

            setStockPrices(oldStockPrices);

            setStockPrices((previousState) => {
                return [...previousState]
            })

        };

    },[stockPrices]);

    return (
        <React.Fragment>
            <Grid container direction="row"
                  justify="flex-start"
                  alignItems="flex-start" spacing={2}>
                {(stockPrices).map((stock,index) => {
                        return (<Grid item xs={4} sm={3} md={3} key={Object.keys(stock)[0]}>
                            <Stock
                                stock={Object.keys(stock)[0]}
                                updateTime={stock[Object.keys(stock)[0]].value.updateTime}
                                histoy={stock[Object.keys(stock)[0]].value.values}
                                price={stock[Object.keys(stock)[0]].value.values.slice(-1)[0]}
                                change={stock[Object.keys(stock)[0]].value.change}
                            />
                        </Grid>)
                    }
                )}
            </Grid>

        </React.Fragment>
    );
}