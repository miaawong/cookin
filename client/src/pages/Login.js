import React, { useRef, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { login } from "../auth/authAction";
import {
    StyledForm,
    Submit,
    TextInput,
    Main,
    ErrorMessage,
} from "../recipes/components/StyledForm";
import ramen from "../images/ramen.png";
import {
    StyledMain,
    ImageContainer,
    Img,
    Title,
} from "../main/components/StyledAuth";
const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Login = ({ id }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, reset, setError } = useForm();
    const onSubmit = (data) => {
        dispatch(login(data)).then(
            (res) =>
                res &&
                res === "Unauthorized" &&
                setError([
                    {
                        type: "required",
                        name: "email",
                        message: "Incorrect Email or Password",
                    },
                    {
                        type: "required",
                        name: "password",
                        message: "Incorrect Email or Password",
                    },
                ])
        );
        reset();
    };

    if (id) {
        // eslint-disable-next-line
        return <Redirect to="/dashboard" />;
    }
    return (
        <StyledMain>
            <ImageContainer>
                <a
                    href="https://blush.design/artists/elsma-ramirez"
                    style={{ height: "100%" }}
                >
                    <Img src={ramen} alt="Illustration of food" />
                </a>
            </ImageContainer>
            <Right>
                <Title>Login</Title>
                <h3>
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                        <label
                            style={{
                                color: "#ffda0b",
                                cursor: "pointer",
                            }}
                        >
                            Create one
                        </label>
                    </Link>{" "}
                    here.
                </h3>
                <StyledForm
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ margin: "0", width: "auto" }}
                >
                    <label>
                        Email
                        <TextInput
                            type="email"
                            name="email"
                            placeholder="john@gmail.com"
                            ref={register({
                                required: "I cannot be empty",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Invalid email address",
                                },
                            })}
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
                            placeholder="********"
                            ref={(e) => {
                                register(
                                    e,
                                    {
                                        required: "I cannot be empty",
                                    },
                                    (passwordRef.current = e)
                                );
                            }}
                        />
                        <ErrorMessage>
                            {errors.password && "*" + errors.password.message}
                        </ErrorMessage>
                    </label>

                    <Submit
                        type="submit"
                        value="Submit"
                        style={{ display: "block", margin: "0 auto" }}
                    >
                        Login
                    </Submit>
                </StyledForm>
            </Right>
            <div style={{ marginBottom: "5rem" }}></div>
        </StyledMain>
    );
};

const mapStateToProps = (state) => ({
    id: state["authReducer"].id,
});
export default connect(mapStateToProps)(Login);
