import * as authActionTypes from "./authActionTypes";

const initState = {
    id: "",
    name: "",
    email: "",
    JWToken: "",
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authActionTypes.SIGNUP_REQUEST:
            return {
                ...state,
                email: action.payload.email,
                JWToken: action.payload.token,
                id: action.payload._id,
                name: action.payload.name,
            };
        case authActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                email: action.payload.email,
                JWToken: action.payload.token,
                id: action.payload._id,
                name: action.payload.name,
            };
        case authActionTypes.LOGOUT:
            return {
                email: initState.email,
                JWToken: initState.JWToken,
                id: initState._id,
                name: initState.name,
            };
        case authActionTypes.SET_NEW_TOKEN:
            return {
                ...state,
                JWToken: action.payload.token,
            };
        case authActionTypes.GET_JWT:
            return {
                ...state,
                JWToken: action.payload.JWToken,
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
            };
        default:
            return state;
    }
};

export default authReducer;
