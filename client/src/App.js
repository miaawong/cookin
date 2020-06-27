import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import CreateRecipe from "./pages/CreateRecipe";
import Recipe from "./pages/recipe";
import Settings from "./pages/Settings";
import { getJWT } from "./auth/authAction";
import logo from "./images/cover.png";
import { device } from "./Theme";
import LoggedInNav from "./main/components/LoggedInNav";
import Explore from "./pages/explore";

const TopBar = styled.div`
    width: 88%;
    margin: ${({ JWToken }) => (JWToken ? "0 0 0 3rem" : "0 2rem 0 3rem")};
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-content: center;
    /* height: 9%; */
    @media ${device.small}, ${device.medium} {
        padding: 0;
        justify-content: center;
        width: 100%;
        background: ${(props) => props.theme.colors.yellow};
        margin: 0;
    }
`;
const Nav = styled.div`
    width: 18rem;
    z-index: 1;
    @media ${device.small}, ${device.medium} {
        position: fixed;
        background: black;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3rem;
        padding: 0;
    }
`;
const Label = styled.label`
    font-size: ${(props) => props.theme.fontSizes.medium};
    padding: 0.5em;
    margin: 0 0.3em;
    height: 100%;
    @media ${device.laptop} {
        margin: 0 auto;
    }
    & > a {
        vertical-align: middle;
        color: black;
        @media ${device.small}, ${device.medium} {
            color: white;
            vertical-align: baseline;
        }
    }
`;

const Links = styled.div`
    font-family: ${(props) => props.theme.font};
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
    @media ${device.small}, ${device.medium} {
        justify-content: space-around;
    }
`;

const Logo = styled.img`
    height: 75px;
    @media ${device.small} {
        height: 50px;
    }
    @media ${device.medium} {
        height: 60px;
    }
    @media ${device.large} {
        height: 70px;
    }
`;

const App = ({ JWToken }) => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!JWToken) {
    //         dispatch(getJWT()).then((JWToken) => {
    //             JWToken === "undefined" && console.log("undefined");
    //         });
    //     }
    //     JWToken ? setLogged(true) : setLogged(false);
    //     //eslint-disable-next-line
    // }, [JWToken]);

    return (
        <Router>
            <TopBar JWToken={JWToken}>
                <Link to="/">
                    <Logo src={logo} alt="cookin logo" />
                </Link>
                {!JWToken ? (
                    <Nav>
                        <Links>
                            <Label>
                                <Link
                                    to="/signup"
                                    style={{
                                        // color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </Label>

                            <Label>
                                <Link
                                    to="/login"
                                    style={{
                                        // color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    Login
                                </Link>
                            </Label>
                        </Links>
                    </Nav>
                ) : (
                    <LoggedInNav></LoggedInNav>
                )}
            </TopBar>

            <Switch>
                <Route exact path="/health">
                    <h3>The App is Healthy</h3>
                </Route>
                <Route exact path="/explore">
                    <Explore JWToken={JWToken} />
                </Route>
                <Route exact path="/">
                    <Home JWToken={JWToken} />
                </Route>
                <Route exact path="/signup">
                    <SignUp JWToken={JWToken} />
                </Route>
                <Route exact path="/login">
                    <Login JWToken={JWToken} />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard JWToken={JWToken} />
                </Route>
                <Route
                    exact
                    path="/addRecipe"
                    component={CreateRecipe}
                    JWToken={JWToken}
                ></Route>
                <Route exact path={"/recipes/:recipeId"}>
                    <Recipe JWToken={JWToken} />
                </Route>
                <Route exact path="/settings">
                    <Settings JWToken={JWToken} />
                </Route>
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
});
export default connect(mapStateToProps)(App);
