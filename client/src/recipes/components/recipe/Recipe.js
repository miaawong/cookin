import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as recipeActionTypes from "../../recipeActionTypes";
import { deleteRecipe } from "../../recipeAction";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { likeRecipe, unlikeRecipe } from "../../recipeAction";
import {
    Main,
    Description,
    Middle,
    ImgContainer,
    Image,
    Modification,
    Button,
    RecipeName,
    Category,
    BottomDesc,
    FavoriteBtn,
    DeleteModalContainer,
    DeleteModal,
    DeleteBtn,
    DeleteRow,
} from "./StyledRecipe";

const RecipeMain = styled(Main)`
    height: 100%;
    width: 100%;
`;

const Recipe = ({ currentRecipe, JWToken, userId, loggedIn }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    let dispatch = useDispatch();
    let history = useHistory();
    const {
        _id,
        recipeName,
        recipeDesc,
        servings,
        duration,
        ingredients,
        directions,
        img,
        createdOn,
        creator,
        ownerId,
        likes,
    } = currentRecipe;

    let capCreator = "";
    if (!creator) {
        return "";
    } else {
        capCreator = creator.charAt(0).toUpperCase() + creator.slice(1);
    }
    let duration_hour = Math.floor(duration / 60);
    let duration_mins = duration % 60;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let month = new Date(createdOn);
    let createdMonth = months[month.getMonth()];
    let createdYear = new Date(createdOn).getFullYear();

    return (
        <RecipeMain
            JWToken={JWToken}
            // style={{ height: "100%", width: "100%" }}
        >
            <ImgContainer>
                <Image
                    alt={recipeName}
                    src={img}
                    style={{ position: "relative" }}
                />
            </ImgContainer>
            <Description>
                <RecipeName>
                    {recipeName}

                    {JWToken ? (
                        likes.indexOf(userId) === -1 ? (
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
                        )
                    ) : (
                        <FavoriteBtn onClick={() => history.push("/signup")}>
                            <FaRegHeart size={30} />
                        </FavoriteBtn>
                    )}
                </RecipeName>

                <span
                    style={{
                        textAlign: "center",
                    }}
                >
                    {recipeDesc}
                </span>
                <BottomDesc>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        <p>
                            Serves:{" "}
                            {{ servings } == !null ? `${servings} people` : ""}
                        </p>

                        <p>
                            Time:{" "}
                            {!isNaN(duration_hour) && `${duration_hour} hr`}{" "}
                            {!isNaN(duration_mins) && `${duration_mins} mins`}
                        </p>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                        }}
                    >
                        <p>
                            {createdMonth} {createdYear}
                        </p>
                        <p>Created By {capCreator}</p>
                    </div>
                    {ownerId === userId && (
                        <Modification>
                            <Button
                                onClick={() => {
                                    dispatch({
                                        type: recipeActionTypes.EDIT_STATE,
                                        payload: true,
                                    });
                                }}
                            >
                                <FaEdit size={22} />
                            </Button>
                            <Button
                                onClick={() => {
                                    setDeleteModal(true);
                                }}
                            >
                                <FaTrash size={20} />
                            </Button>

                            {deleteModal && (
                                <DeleteModalContainer>
                                    <DeleteModal>
                                        <h3>
                                            {" "}
                                            Are you sure about deleting this
                                            recipe?{" "}
                                        </h3>
                                        <p style={{ fontSize: "16px" }}>
                                            This action cannot be undone
                                        </p>
                                        <DeleteRow>
                                            <DeleteBtn
                                                onClick={() => {
                                                    setDeleteModal(false);
                                                }}
                                            >
                                                Cancel
                                            </DeleteBtn>
                                            <DeleteBtn
                                                onClick={() => {
                                                    dispatch(
                                                        deleteRecipe(
                                                            _id,
                                                            JWToken,
                                                            history
                                                        )
                                                    );
                                                }}
                                                style={{ background: "red" }}
                                            >
                                                Delete
                                            </DeleteBtn>
                                        </DeleteRow>
                                    </DeleteModal>
                                </DeleteModalContainer>
                            )}
                        </Modification>
                    )}
                    <Category>Ingredients</Category>
                    <ul>
                        {ingredients &&
                            ingredients.map((ingredient, index) => (
                                <li key={index} style={{ listStyle: "none" }}>
                                    {ingredient.amount}{" "}
                                    {ingredient.unit && ingredient.unit.value}{" "}
                                    {ingredient.ingName}
                                </li>
                            ))}
                    </ul>
                </BottomDesc>
            </Description>
            <Middle>
                <Category>Directions</Category>
                {directions &&
                    directions.map((step, index) => (
                        <p key={index}> - {step}</p>
                    ))}
            </Middle>
        </RecipeMain>
    );
};

export default Recipe;
