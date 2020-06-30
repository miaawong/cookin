import * as recipeActionTypes from "./recipeActionTypes";
import axios from "axios";

export const exploreRecipes = () => {
    return (dispatch) => {
        return axios
            .get("/api/recipes/allRecipes")
            .then((res) => {
                let recipes = res.data.all;
                dispatch({
                    type: recipeActionTypes.GET_ALL_RECIPES,
                    payload: recipes,
                });
                return res.data.all;
            })

            .catch((err) => {
                console.log(err);
            });
    };
};

export const getAllUserRecipes = (token) => {
    return (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .get("/api/users/recipes", config)
            .then((res) => {
                let recipes = res.data.recipe;
                dispatch({
                    type: recipeActionTypes.GET_ALL_RECIPES,
                    payload: recipes,
                });
            })

            .catch((err) => {
                console.log(err);
            });
    };
};

export const setDraftRecipe = (data) => {
    return (dispatch) => {
        const {
            recipeName,
            recipeDesc,
            servings,
            duration_hour,
            duration_mins,
            ingredients,
            directions,
            img,
        } = data;
        let { duration } = data;

        if (duration_hour && duration_mins) {
            duration = parseInt(duration_hour) * 60;
            duration = duration + parseInt(duration_mins);
        }
        // else if it's just mins
        else if (duration_mins) {
            duration = parseInt(duration_mins);
        } else if (duration_hour) {
            duration = parseInt(duration_hour) * 60;
        }

        const recipe = {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
            directions,
            img,
        };
        dispatch({
            type: recipeActionTypes.DRAFT_RECIPE,
            payload: recipe,
        });
    };
};

export const createRecipe = (token, data, history) => {
    return (dispatch) => {
        const {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
            directions,
            img,
        } = data;
        const draftRecipe = {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
            directions,
            img,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post("/api/recipes/", draftRecipe, config)
            .then((res) => {
                let recipeId = res.data.recipe._id;
                let recipe = res.data.recipe;
                recipe.creator = res.data.user;
                history.push(`/recipes/${recipeId}`);
                dispatch({
                    type: recipeActionTypes.ADD_RECIPE,
                    payload: recipe,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const editRecipe = (recipeId, data, token, history) => {
    return (dispatch) => {
        const {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
            directions,
            img,
        } = data;
        console.log(data, "in action");

        const updateRecipe = {
            recipeName,
            recipeDesc,
            servings,
            duration,
            ingredients,
            directions,
            img,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        return axios
            .put(`/api/recipes/${recipeId}`, updateRecipe, config)
            .then((res) => {
                let recipe = res.data.recipe;
                history.push(`/recipes/${recipeId}`);
                dispatch({
                    type: recipeActionTypes.EDIT_RECIPE,
                    payload: recipe,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const getCurrentRecipe = (recipeId, history) => {
    return (dispatch) => {
        axios
            .get(`/api/recipes/${recipeId}`)
            .then((res) => {
                let recipe = res.data.recipe;
                recipe.creator = res.data.user;
                dispatch({
                    type: recipeActionTypes.GET_CURRENT_RECIPE,
                    payload: recipe,
                });
                history.push(`/recipes/${recipeId}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const deleteRecipe = (recipeId, token, history) => {
    return (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios
            .delete(`/api/recipes/${recipeId}`, config)
            .then((res) => {
                history.push("/dashboard");
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const uploadImage = (file, token, config) => {
    return (dispatch) => {
        let data = new FormData();
        let uploadFile = file[0];
        let originalname = uploadFile.name;

        data.append("file", uploadFile);
        data.append("originalname", originalname);
        return axios
            .post(`/api/recipes/upload`, data, config)
            .then((res) => {
                return res.data.data.Location;
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const reset = () => {
    return (dispatch) => {
        dispatch({
            type: recipeActionTypes.RESET_RECIPE,
        });
    };
};

export const likeRecipe = (recipeId, token) => {
    return (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .put(`/api/recipes/${recipeId}/like`, null, config)
            .then((res) => {
                let recipe = res.data;
                dispatch({
                    type: recipeActionTypes.EDIT_RECIPE,
                    payload: recipe,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
export const unlikeRecipe = (recipeId, token) => {
    return (dispatch) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .put(`/api/recipes/${recipeId}/unlike`, null, config)
            .then((res) => {
                let recipe = res.data;
                dispatch({
                    type: recipeActionTypes.EDIT_RECIPE,
                    payload: recipe,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
