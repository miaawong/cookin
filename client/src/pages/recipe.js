import React, { useEffect } from "react";
import RecipeComponent from "../recipes/components/recipe/Recipe";
import { useParams, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getCurrentRecipe, getAllRecipes } from "../recipes/recipeAction";
import * as recipeActionTypes from "../recipes/recipeActionTypes";
import EditRecipe from "./EditRecipe";

const Recipe = ({ currentRecipe, JWToken, edit, userId, loggedIn }) => {
    const { recipeId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentRecipe(recipeId, JWToken, history));
        dispatch(getAllRecipes(JWToken));
        return () => {
            dispatch({
                type: recipeActionTypes.CLEAR_CURRENT_RECIPE,
            });
        };
        //eslint-disable-next-line
    }, []);

    if (edit) {
        console.log("edit is true");
        return <EditRecipe />;
    } else {
        return (
            <RecipeComponent
                currentRecipe={currentRecipe}
                JWToken={JWToken}
                userId={userId}
                loggedIn={loggedIn}
            />
        );
    }
};
const mapStateToProps = (state) => ({
    currentRecipe: state["recipeReducer"].currentRecipe,
    JWToken: state["authReducer"].JWToken,
    edit: state["recipeReducer"].edit,
    userId: state["authReducer"].id,
});

export default connect(mapStateToProps)(Recipe);
