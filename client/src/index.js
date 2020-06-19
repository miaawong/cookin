import React from "react";
import { ThemeProvider } from "styled-components";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import rootReducer from "./rootReducer";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { getJWT } from "./auth/authAction";
import Axios from "axios";
import { theme } from "./Theme";

let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// eslint-disable-next-line
axios.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log("error intercepted", error);
            originalRequest._retry = true;
            return Promise.resolve(
                store.dispatch(getJWT()).then((token) => {
                    error.config.headers["Authorization"] = `Bearer ${token}`;

                    return axios.request(originalRequest);
                })
            );
        } else {
            // return Error object with Promise
            console.log("promise rejected");
            return Promise.reject(error);
        }
    }
);

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
