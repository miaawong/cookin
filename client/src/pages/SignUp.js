import React, { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "../auth/authAction";
import {
    StyledForm,
    Submit,
    TextInput,
    Main,
    ErrorMessage,
} from "../recipes/components/StyledForm";
import salad from "../images/salad.png";
import {
    StyledMain,
    ImageContainer,
    Img,
    Title,
    Check,
} from "../main/components/StyledAuth";
import styled from "styled-components";

const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SignUp = () => {
    const { register, handleSubmit, errors } = useForm();
    const [signUpError, setSignUpError] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data) => {
        dispatch(signUp(data, history)).then((res) =>
            res && res.response.status === 400 ? setSignUpError(true) : null
        );
    };

    return (
        <StyledMain>
            <ImageContainer style={{ height: "35%" }}>
                <a
                    href="https://blush.design/artists/elsma-ramirez"
                    style={{ height: "100%" }}
                >
                    <Img src={salad} alt="Illustration of food" />
                </a>
            </ImageContainer>
            <Right>
                <Title>Sign Up</Title>
                <Check>
                    Have an account?{" "}
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <label
                            style={{
                                color: "#ffda0b",
                                cursor: "pointer",
                            }}
                        >
                            Login
                        </label>
                    </Link>{" "}
                    instead
                </Check>
                <StyledForm
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        margin: "0",
                        width: "auto",
                        justifyContent: "center",
                    }}
                >
                    <label>
                        Name
                        <TextInput
                            type="text"
                            name="name"
                            ref={register({
                                required: "I cannot be empty",
                                minLength: {
                                    value: 2,
                                    message: " Must be at least 2 characters",
                                },
                            })}
                            style={{ margin: "0" }}
                            placeholder="John"
                        />
                        <ErrorMessage>
                            {errors.name && "*" + errors.name.message}
                        </ErrorMessage>
                    </label>

                    <label>
                        Email
                        <TextInput
                            type="text"
                            name="email"
                            ref={register({
                                required: "I cannot be empty",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Invalid email address",
                                },
                            })}
                            placeholder="john@gmail.com"
                        />
                        <ErrorMessage>
                            {errors.email && "*" + errors.email.message}
                        </ErrorMessage>
                    </label>

                    <label>
                        Password
                        <TextInput
                            type="password"
                            name="password"
                            ref={register({
                                required: "I cannot be empty",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Must be at least 8 characters please! ",
                                },
                            })}
                            placeholder="********"
                        />
                        <ErrorMessage>
                            {errors.password && "*" + errors.password.message}
                        </ErrorMessage>
                        {signUpError && (
                            <ErrorMessage>*Email already exists</ErrorMessage>
                        )}
                    </label>

                    <Submit
                        type="submit"
                        value="Submit"
                        style={{ display: "block", margin: "0 auto" }}
                    >
                        Create An Account
                    </Submit>
                </StyledForm>
            </Right>
            <div style={{ marginBottom: "5rem" }}></div>
        </StyledMain>
    );
};
export default SignUp;
