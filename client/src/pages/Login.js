import React from "react";
import { Redirect, Link } from "react-router-dom";
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

const Login = ({ id }) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        dispatch(login(data));
    };

    if (id) {
        // eslint-disable-next-line
        return <Redirect to="/dashboard" />;
    }
    return (
        <Main
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
            }}
        >
            <div style={{ width: "50%" }}>
                <a href="https://blush.design/artists/elsma-ramirez">
                    <img
                        src={ramen}
                        alt="Illustration of food"
                        style={{ width: "65%", objectFit: "cover" }}
                    />
                </a>
            </div>
            <div>
                <h1>Login</h1>
                <h3>
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                        <label
                            style={{
                                color: "#F1CC00",
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
                    style={{ margin: "0", width: "auto", height: "auto" }}
                >
                    <label>
                        Email
                        <TextInput
                            type="text"
                            name="email"
                            placeholder="Email"
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
                            placeholder="Password"
                            ref={register({
                                required: "I cannot be empty",
                                minLength: {
                                    value: 8,
                                    message: "Must be at least 8 characters",
                                },
                            })}
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
            </div>
        </Main>
    );
};

const mapStateToProps = (state) => ({
    id: state["authReducer"].id,
});
export default connect(mapStateToProps)(Login);
