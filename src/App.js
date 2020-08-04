import React from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import HeaderBar from "./Components/HeaderBar";
import TickerContainer from "./Components/TickerContainer";
import {createMuiTheme} from '@material-ui/core/styles';
import {deepOrange, orange} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    // palette: {
    //     primary: orange,
    //     secondary: deepOrange
    // },
});

function App() {
    return (
        <div className="App">
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <HeaderBar/>
                <TickerContainer/>
            </ThemeProvider>

        </div>
    );
}

export default App;
