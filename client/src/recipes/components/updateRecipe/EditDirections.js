import React from "react";
import { connect, useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { editRecipe } from "../../recipeAction";
import { StyledForm, Submit, TextArea, ProgressLabel } from "../StyledForm";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const AddMore = styled.button`
    width: 4rem;
    padding: 0.5rem;
    border: none;
    background: #000;
`;
const EditDirections = ({ JWToken, draftRecipe, recipe }) => {
    let { _id, directions } = recipe;
    const history = useHistory();
    const dispatch = useDispatch();

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            directions: directions,
        },
    });
    const { fields, append } = useFieldArray({
        control,
        name: "directions",
    });

    const onSubmit = (data) => {
        draftRecipe.directions = data.directions;
        dispatch(editRecipe(_id, draftRecipe, JWToken, history));
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <ProgressLabel>Directions</ProgressLabel>
            {fields.map((input, index) => {
                return (
                    <label key={index}>
                        {`Step ${index + 1}`}
                        <TextArea
                            type="text"
                            name={`directions[${index}]`}
                            ref={register}
                        />
                    </label>
                );
            })}
            <AddMore
                onClick={(e) => {
                    e.preventDefault();
                    append({ directions: "directions" });
                }}
            >
                <FaPlus style={{ color: "white" }} size={22} />
            </AddMore>
            <div>
                <Submit
                    type="submit"
                    value="Submit"
                    style={{ float: "right", margin: "2rem 0" }}
                >
                    Submit
                </Submit>
            </div>
        </StyledForm>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    draftRecipe: state["recipeReducer"].draftRecipe,
});
export default connect(mapStateToProps)(EditDirections);
