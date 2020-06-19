import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import recipeReducer from "./recipes/recipeReducer";

export default combineReducers({
    authReducer,
    recipeReducer,
});
