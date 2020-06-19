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

const Theme = styled.div`
    font-family: ${(props) => props.theme.font};
`;

const Nav = styled.div`
    height: 10%;
    width: 20%;
    position: fixed;
    top: 0;
    right: 2.5rem;
    padding: 2rem 0;

    @media ${device.small}, ${device.medium}, ${device.large} {
        background: black;
        bottom: 0;
        left: 0;
        top: auto;
        width: 100%;
        height: 4rem;
        padding: 0;
    }

    @media ${device.ipad} {
        background: black;
        bottom: 7.9rem;
        left: 0;
        top: auto;
        width: 100%;
        height: 4rem;
        padding: 0;
    }
`;
const Label = styled.label`
    font-size: ${(props) => props.theme.fontSizes.medium};
    background: black;
    padding: 0.5em;
    margin: 0 0.3em;

    @media ${device.laptop} {
        margin: 0 auto;
    }
`;

const Links = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-around;
    @media ${device.laptop} {
        justify-content: space-between;
    }
`;

const TopBar = styled.div`
    margin: ${({ JWToken }) => (JWToken ? "0 6rem 0 2rem" : "0 2rem")};
    padding: 1rem 0;
`;
const Logo = styled.img`
    height: 75px;
    @media ${device.small} {
        height: 70px;
    }
`;

const App = ({ JWToken }) => {
    const dispatch = useDispatch();
    const [loggedIn, setLogged] = useState(false);
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
            <Theme>
                <TopBar JWToken={JWToken}>
                    <Link to="/">
                        <Logo src={logo} alt="cookin logo" />
                    </Link>
                </TopBar>

                {!JWToken ? (
                    <Nav>
                        <Links>
                            <Label>
                                <Link
                                    to="/signup"
                                    style={{
                                        color: "white",
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
                                        color: "white",
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
            </Theme>
            <Switch>
                <Route exact path="/explore">
                    <Explore loggedIn={loggedIn} />
                </Route>
                <Route exact path="/">
                    <Home loggedIn={loggedIn} />
                </Route>
                <Route exact path="/signup">
                    <SignUp loggedIn={loggedIn} />
                </Route>
                <Route exact path="/login">
                    <Login loggedIn={loggedIn} />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard loggedIn={loggedIn} />
                </Route>
                <Route
                    exact
                    path="/addRecipe"
                    component={CreateRecipe}
                    loggedIn={loggedIn}
                ></Route>
                <Route exact path={"/recipes/:recipeId"}>
                    <Recipe loggedIn={loggedIn} />
                </Route>
                <Route exact path="/settings">
                    <Settings loggedIn={loggedIn} />
                </Route>
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state) => ({
    JWToken: state["authReducer"].JWToken,
});
export default connect(mapStateToProps)(App);
