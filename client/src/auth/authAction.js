import * as actionTypes from "./authActionTypes";
import axios from "axios";
export const signUp = (data, history) => {
    return (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return axios
            .post("/api/auth/", data, config)
            .then((res) => {
                let { _id, name, email } = res.data.newUser;
                let { token, refreshToken } = res.data;
                document.cookie = `refreshToken=${refreshToken}`;
                dispatch({
                    type: actionTypes.SIGNUP_REQUEST,
                    payload: {
                        _id,
                        name,
                        email,
                        token,
                    },
                });
                history.push("/dashboard");
            })
            .catch((err) => {
                return err;
            });
    };
};
export const login = (data) => {
    return (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return axios
            .post("/api/auth/login", data, config)
            .then((res) => {
                let { token, refreshToken } = res.data;
                let { _id, name, email } = res.data.userData;

                document.cookie = `refreshToken=${refreshToken}`;
                dispatch({
                    type: actionTypes.LOGIN_REQUEST,
                    payload: {
                        email,
                        token,
                        _id,
                        name,
                    },
                });
            })
            .catch((err) => {
                return err;
            });
    };
};

export const getJWT = () => {
    return (dispatch) => {
        return axios
            .post("/api/auth/refresh_token", null, {
                withCredentials: true,
            })
            .then((res) => {
                let { JWToken, _id, name, email } = res.data;

                dispatch({
                    type: actionTypes.GET_JWT,
                    payload: {
                        JWToken,
                        _id,
                        name,
                        email,
                    },
                });
                return JWToken;
            })
            .catch((err) => {
                console.log(err, "newjwterr");
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        axios
            .post("/api/auth/logout", {}, { withCredentials: true })
            .then((res) => {
                console.log(res);
                dispatch({
                    type: actionTypes.LOGOUT,
                });
            });
    };
};
