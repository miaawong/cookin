import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import CreateRecipeDetails from "../recipes/components/newRecipe/CreateRecipeDetails";
import CreateIngredients from "../recipes/components/newRecipe/CreateIngredients";
import CreateDirections from "../recipes/components/newRecipe/CreateDirections";
import { reset } from "../recipes/recipeAction";
import { Main } from "../main/components/StyledMain";

const CreateRecipe = ({ JWToken, draftRecipeProgress }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(reset());
        };
        //eslint-disable-next-line
    }, []);
    let currentStep;
    if (draftRecipeProgress === 0) {
        currentStep = <CreateRecipeDetails />;
    } else if (draftRecipeProgress === 1) {
        currentStep = <CreateIngredients />;
    } else if (draftRecipeProgress === 2) {
        currentStep = <CreateDirections />;
    }
    return <Main>{currentStep}</Main>;
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    draftRecipeProgress: state["recipeReducer"].draftRecipeProgress,
});
export default connect(mapStateToProps)(CreateRecipe);
