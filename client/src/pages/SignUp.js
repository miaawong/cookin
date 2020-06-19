import React from "react";
import { useDispatch } from "react-redux";
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
import dinner from "../images/munchies.png";

const SignUp = () => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data) => {
        dispatch(signUp(data, history));
    };

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
                        src={dinner}
                        alt="Illustration of food"
                        style={{ width: "100%", objectFit: "cover" }}
                    />
                </a>
            </div>
            <div>
                <h1>Sign Up</h1>
                <h3>
                    Have an account?{" "}
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <label
                            style={{
                                color: "#F1CC00",
                                cursor: "pointer",
                            }}
                        >
                            Login
                        </label>
                    </Link>{" "}
                    instead
                </h3>
                <StyledForm
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ margin: "0", width: "auto" }}
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
                            placeholder="Email"
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
                            placeholder="Password"
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
                        Create An Account
                    </Submit>
                </StyledForm>
            </div>
        </Main>
    );
};
export default SignUp;
