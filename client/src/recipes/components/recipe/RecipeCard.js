import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getCurrentRecipe, likeRecipe, unlikeRecipe } from "../../recipeAction";
import styled from "styled-components";
import { device } from "../../../Theme";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Main } from "../../../main/components/StyledMain";
import { ProgressLabel } from "../StyledForm";
import { FavoriteBtn } from "./StyledRecipe";
const CardBox = styled.div`
    background: #f8f8f8;
    margin: ${({ recipes }) =>
        recipes.length === 1 ? "1rem auto" : "1rem auto"};
    width: 38rem;
    height: 28rem;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    box-shadow: 5px 5px 5px 0px rgba(230, 230, 230, 1);
    /* justify-content: flex-start; */
    align-content: flex-start;
    @media ${device.laptop}, ${device.wide} {
        width: 27rem;
        height: 25rem;
    }
`;
const Image = styled.img`
    object-fit: cover;
    width: 100%;
    height: 65%;
`;

const DescriptionBox = styled.div`
    padding: 0 1rem;
    width: 100%;
    height: 35%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: left;
    align-content: flex-start;
    justify-content: center;
    font-size: ${(props) => props.theme.fontSizes.small};
    text-align: center;
    @media ${device.laptop}, ${device.wide} {
        /* height: 45%; */
    }
`;
const RecipeName = styled.h1`
    width: 100%;
    margin: 0%;
    font-weight: 800;
    font-size: ${(props) => props.theme.fontSizes.large};
    display: flex;
    justify-content: center;
`;

const Description = styled.p`
    margin: 0.5rem 0 1rem 0;
`;

const StyledLink = styled.button`
    color: #ffffff;
    width: 5rem;
    line-height: 2rem;
    background: black;
    padding: 3px;
    text-align: center;
    margin: 0 auto;
    border: none;
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.73);
    text-decoration: none;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSizes.small};
    & > label {
        cursor: pointer;
        text-transform: uppercase;
    }
`;

const RecipeCard = ({ userId, recipes, JWToken, loggedIn }) => {
    const dispatch = useDispatch();
    let history = useHistory();

    let card = recipes.map((recipe) => {
        const { img, recipeName, recipeDesc, likes, _id } = recipe;
        return (
            <CardBox recipes={recipes} key={_id}>
                <Image src={img} recipes={recipes} />

                <DescriptionBox>
                    <RecipeName>
                        {" "}
                        {likes.indexOf(userId) === -1 ? (
                            <FavoriteBtn
                                onClick={() =>
                                    dispatch(likeRecipe(_id, JWToken))
                                }
                            >
                                <FaRegHeart size={30} />
                            </FavoriteBtn>
                        ) : (
                            <FavoriteBtn
                                onClick={() =>
                                    dispatch(unlikeRecipe(_id, JWToken))
                                }
                            >
                                <FaHeart
                                    style={{
                                        color: "#FB170A",
                                    }}
                                    size={30}
                                />
                            </FavoriteBtn>
                        )}
                        {recipeName}
                    </RecipeName>
                    <Description>
                        {recipeDesc.length > 40
                            ? `${recipeDesc.substr(0, 40)}...`
                            : recipeDesc}
                    </Description>
                    <StyledLink
                        onClick={() => {
                            dispatch(getCurrentRecipe(recipe._id, history));
                        }}
                    >
                        <label>Recipe</label>
                    </StyledLink>
                </DescriptionBox>
            </CardBox>
        );
    });

    if (recipes.length === 0) {
        return (
            <Main loggedIn={loggedIn}>
                <div>
                    <h1>Looks like you don't have any recipes!</h1>
                    <Link to="/addRecipe" style={{ textDecoration: "none" }}>
                        <label
                            style={{
                                background: "black",
                                color: "white",
                                padding: "1rem",
                                fontSize: "24px",
                            }}
                        >
                            Add New Recipe!
                        </label>
                    </Link>
                </div>
            </Main>
        );
    } else {
        return (
            <Main loggedIn={loggedIn}>
                <div style={{ width: "100%" }}>
                    <ProgressLabel>My Recipes</ProgressLabel>
                </div>
                {card}
            </Main>
        );
    }
};
const mapStateToProps = (state) => ({
    userId: state["authReducer"].id,
    JWToken: state["authReducer"].JWToken,
});

export default connect(mapStateToProps)(RecipeCard);
