import * as recipeActionTypes from "./recipeActionTypes";
import * as authActionTypes from "../auth/authActionTypes";

const initState = {
    recipes: [],
    currentRecipe: {},
    draftRecipe: {},
    draftRecipeProgress: 0,
    edit: false,
};

const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case recipeActionTypes.GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                edit: false,
            };
        case recipeActionTypes.DRAFT_RECIPE:
            return {
                ...state,
                draftRecipe: action.payload,
                draftRecipeProgress: state.draftRecipeProgress + 1,
            };
        case recipeActionTypes.ADD_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload,
                recipes: [...state.recipes, action.payload],
                draftRecipeProgress: 0,
            };

        case recipeActionTypes.EDIT_RECIPE:
            let updatedLikesRecipe = state.recipes.map((recipe) => {
                // if the recipeId matches the updated recipeId
                if (recipe._id === action.payload._id) {
                    return {
                        ...recipe,
                        recipe: action.payload,
                    };
                } else {
                    return {
                        ...recipe,
                    };
                }
            });

            return {
                ...state,
                recipes: updatedLikesRecipe,
                currentRecipe: { ...state.currentRecipe, ...action.payload },
                edit: false,
            };

        // case recipeActionTypes.GET_CURRENT_RECIPE:
        //     return {
        //         ...state,
        //         currentRecipe: action.payload,
        //     };

        case recipeActionTypes.GET_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload,
            };
        case recipeActionTypes.CLEAR_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: {},
            };
        case recipeActionTypes.EDIT_STATE:
            return {
                ...state,
                edit: action.payload,
            };
        case recipeActionTypes.RESET_RECIPE:
            return {
                ...state,
                edit: false,
                draftRecipe: {},
                draftRecipeProgress: 0,
            };
        case authActionTypes.LOGOUT:
            return {
                recipes: initState.recipes,
                currentRecipe: initState.currentRecipe,
                edit: initState.edit,
            };

        default:
            return state;
    }
};

export default recipeReducer;
