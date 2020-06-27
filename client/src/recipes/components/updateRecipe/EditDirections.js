import React from "react";
import { connect, useDispatch } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { editRecipe } from "../../recipeAction";
import { StyledForm, Submit, TextArea, ProgressLabel } from "../StyledForm";
import styled from "styled-components";

const AddMore = styled.button`
    display: block;
    color: white;
    padding: 0.5rem;
    border: none;
    background: #000;
    border-radius: 8px;
    font-size: ${(props) => props.theme.fontSizes.small};
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
                Add More
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
            <div style={{ marginBottom: "5rem" }} />
        </StyledForm>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
    draftRecipe: state["recipeReducer"].draftRecipe,
});
export default connect(mapStateToProps)(EditDirections);
