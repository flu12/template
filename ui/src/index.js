import React from 'react';
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from "react-router-dom";
import {theme} from "./config/materialUi/theme";
import { initializeStore } from './config/redux/store';
import App from './App';
import './styles/global.css';
import './config/translations';
const store = initializeStore();

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
