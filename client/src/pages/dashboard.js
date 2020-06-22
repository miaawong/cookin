import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
// import RecipesList from "../recipes/components/recipe/RecipesList";
import RecipeCard from "../recipes/components/recipe/RecipeCard";
import { Redirect } from "react-router-dom";
import { getAllUserRecipes } from "../recipes/recipeAction.js";

const Dashboard = ({ name, id, JWToken, recipes, loggedIn }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        JWToken && dispatch(getAllUserRecipes(JWToken));
        //eslint-disable-next-line
    }, []);
    if (!id) {
        return <Redirect to="/login"></Redirect>;
    }

    /* todo: recipelist when fullscreen */
    /* <RecipesList /> */

    return <RecipeCard recipes={recipes} loggedIn={loggedIn} />;
};
const mapStateToProps = (state) => ({
    toDashboard: state["authReducer"].toDashboard,
    name: state["authReducer"].name,
    id: state["authReducer"].id,
    JWToken: state["authReducer"].JWToken,
    recipes: state["recipeReducer"].recipes,
});
export default connect(mapStateToProps)(Dashboard);
