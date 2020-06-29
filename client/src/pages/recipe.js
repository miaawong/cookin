import React, { useEffect } from "react";
import RecipeComponent from "../recipes/components/recipe/Recipe";
import { useParams, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { getCurrentRecipe, getAllUserRecipes } from "../recipes/recipeAction";
import * as recipeActionTypes from "../recipes/recipeActionTypes";
import EditRecipe from "./EditRecipe";

const Recipe = ({ currentRecipe, JWToken, edit, userId, loggedIn }) => {
    const { recipeId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getCurrentRecipe(recipeId, history));
        return () => {
            dispatch({
                type: recipeActionTypes.CLEAR_CURRENT_RECIPE,
            });
        };
        //eslint-disable-next-line
    }, []);

    if (edit) {
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
