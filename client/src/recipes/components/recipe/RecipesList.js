import React from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getCurrentRecipe } from "../../recipeAction";

const ListOfRecipes = styled.div`
    width: 300px;
    border: 2px solid black;
`;
const UserRecipes = ({ recipes, JWToken }) => {
    let dispatch = useDispatch();
    let history = useHistory();
    let name = recipes.map((recipe) => {
        return (
            <li key={recipe._id}>
                <button
                    onClick={() => {
                        dispatch(getCurrentRecipe(recipe._id, history));
                    }}
                >
                    {recipe.recipeName}
                </button>
            </li>
        );
    });
    return (
        <ListOfRecipes>
            <ul>{name}</ul>
        </ListOfRecipes>
    );
};
const mapStateToProps = (state) => ({
    recipes: state["recipeReducer"].recipes,
    JWToken: state["authReducer"].JWToken,
});

export default connect(mapStateToProps)(UserRecipes);
