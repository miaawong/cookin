import React, { useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { setDraftRecipe } from "../../recipeAction";
import { StyledForm, Submit, TextInput, ProgressLabel } from "../StyledForm";
import { Ingredient, IngredientRow, AddButton } from "../StyledIngredients";

import styled from "styled-components";
import { device, theme } from "../../../Theme";

const UnitLabel = styled.label`
    width: 100%;
    @media ${device.laptop}, ${device.wide} {
        width: 15rem;
    }
`;

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        borderBottom: "1px solid #d0d5da",
        color: "#000000",
        backgroundColor: state.isSelected ? `${theme.colors.yellow}` : "white",
        "&:hover": {
            background: `${theme.colors.yellow}`,
        },
    }),
    control: (provided) => ({
        ...provided,
        border: "1px solid black",
        borderRadius: "8px",
        // This line disable the blue border
        boxShadow: "none",
        "&:hover": {
            border: "2px solid black",
        },
        margin: ".5rem 0",
    }),
};
const EditIngredients = ({ draftRecipe, recipe }) => {
    const [options, setOptions] = useState([
        { value: " ", label: " " },
        { value: "tsp", label: "tsp" },
        { value: "tbsp", label: "tbsp" },
        { value: "cup", label: "cup" },
        { value: "oz", label: "oz" },
        { value: "lb", label: "lb" },
        { value: "g", label: "g" },
        { value: "kg", label: "kg" },
        { value: "ml", label: "ml" },
        { value: "l", label: "l" },
        { value: "other", label: "other" },
    ]);
    let { ingredients } = recipe;

    const dispatch = useDispatch();
    const { register, handleSubmit, control, setValue, watch } = useForm({
        defaultValues: {
            ingredients: ingredients,
        },
    });
    const { fields, append } = useFieldArray({
        control,
        name: "ingredients",
    });
    const onSubmit = (data) => {
        draftRecipe.ingredients = data.ingredients;
        dispatch(setDraftRecipe(draftRecipe));
    };
    const [option, setOpt] = useState("");
    const ingredientRef = useRef();
    const amountRef = useRef();
    const unitRef = useRef();

    return (
        <StyledForm
            onSubmit={handleSubmit(onSubmit)}
            style={{ justifyContent: "flex-start" }}
        >
            <ProgressLabel>Ingredients</ProgressLabel>
            {fields.map((input, index) => {
                const unit = watch(`ingredients[${index}].unit`);
                return (
                    <Ingredient key={input.id} unit={unit}>
                        <IngredientRow>
                            <label>
                                Ingredient
                                <TextInput
                                    type="text"
                                    name={`ingredients[${index}].ingName`}
                                    placeholder="ingredient"
                                    ref={(e) => {
                                        register(e);
                                        ingredientRef.current = e;
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            amountRef.current.focus();
                                        }
                                    }}
                                />
                            </label>

                            <label>
                                Amount
                                <TextInput
                                    type="text"
                                    name={`ingredients[${index}].amount`}
                                    placeholder="how much?"
                                    ref={(e) => {
                                        register(e);
                                        amountRef.current = e;
                                    }}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            unitRef.current.focus();
                                        }
                                    }}
                                />
                            </label>

                            <UnitLabel>
                                Unit
                                <Controller
                                    as={
                                        <Select
                                            onChange={([e]) => e.value}
                                            ref={(e) => {
                                                register(e);
                                                unitRef.current = e;
                                            }}
                                            styles={customStyles}
                                            maxMenuHeight={150}
                                        />
                                    }
                                    value={option}
                                    option={option}
                                    options={options}
                                    name={`ingredients[${index}].unit`}
                                    control={control}
                                />
                            </UnitLabel>
                        </IngredientRow>
                        {unit && unit.value === "other" && (
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                }}
                            >
                                <TextInput
                                    placeholder="New Unit"
                                    name="otherOptions"
                                    ref={register}
                                    onChange={(event) =>
                                        setOpt({
                                            value: event.target.value,
                                            label: event.target.value,
                                        })
                                    }
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            setOptions([...options, option]);
                                            setValue(
                                                `ingredients[${index}].unit`,
                                                option
                                            );
                                        }
                                    }}
                                    style={{
                                        width: "20rem",
                                        margin: "0",
                                    }}
                                />
                                <AddButton
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setOptions([...options, option]);
                                        setValue(
                                            `ingredients[${index}].unit`,
                                            option
                                        );
                                    }}
                                >
                                    Add
                                </AddButton>
                            </div>
                        )}
                    </Ingredient>
                );
            })}
            <AddButton
                onClick={(e) => {
                    e.preventDefault();
                    append({
                        ingredients: "ingredients",
                    });
                }}
            >
                Add More Ingredients
            </AddButton>
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
    draftRecipe: state["recipeReducer"].draftRecipe,
});
export default connect(mapStateToProps)(EditIngredients);
