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
import { StyledMain, ImageContainer, Img } from "../main/StyledAuth";
const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Login = ({ id }) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const { register, handleSubmit, errors, reset } = useForm();
    const [loginError, setLoginError] = useState(false);
    const onSubmit = (data) => {
        dispatch(login(data)).then((res) =>
            res && res.response.status === 401
                ? (emailRef.current.value = "") &
                  (passwordRef.current.value = "") &
                  setLoginError(true)
                : null
        );
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
                <h1>Login</h1>
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
                            type="text"
                            name="email"
                            placeholder="john@gmail.com"
                            ref={(e) => {
                                register(
                                    e,
                                    {
                                        required: "I cannot be empty",
                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: "Invalid email address",
                                        },
                                    },
                                    (emailRef.current = e)
                                );
                            }}
                        />
                        <ErrorMessage>
                            {errors.email && "*" + errors.email.message}
                        </ErrorMessage>
                        {loginError && (
                            <ErrorMessage>
                                *Incorrect Email or Password, please try again
                            </ErrorMessage>
                        )}
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
        </StyledMain>
    );
};

const mapStateToProps = (state) => ({
    id: state["authReducer"].id,
});
export default connect(mapStateToProps)(Login);
