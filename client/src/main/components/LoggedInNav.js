import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/authAction";
import { MdFavorite, MdCreate, MdSettings } from "react-icons/md";
import { FaSignOutAlt, FaSearch, FaBook } from "react-icons/fa";
import { device } from "../../Theme";

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    display: flex;
    height: 5rem;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    & > label {
        cursor: pointer;
        display: none;
        font-family: ${(props) => props.theme.font};
    }
    :nth-last-child(2) {
        margin-top: 0;
    }

    @media ${device.laptop}, ${device.wide} {
        :nth-last-child(2) {
            margin-top: auto;
        }
    }
`;
const Nav = styled.nav`
    font-family: ${(props) => props.theme.fontFamily};
    z-index: 1;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    right: 0;
    background: black;
    padding: 0 1rem;
    bottom: 0;
    width: 100%;
    height: 3rem;
    top: auto;
    flex-direction: row;

    @media ${device.wide}, ${device.laptop} {
        transition: width 200ms ease;
        flex-direction: column;
        padding-top: 2rem;
        top: 0;
        height: 100%;
        width: 4rem;
        &:hover {
            width: 16rem;
        }

        &:hover label {
            display: inline-block;
            margin-left: 0.5rem;
            color: white;
            font-size: ${(props) => props.theme.fontSizes.medium};
        }

        &:hover > ${StyledLink} {
            width: 12rem;
            justify-content: space-between;
        }
    }

    @media ${device.large}, ${device.ipad} {
        /* height: 5rem; */
        bottom: 9%;
    }
`;
export default function LoggedInNav() {
    const dispatch = useDispatch();
    return (
        <Nav>
            <StyledLink to="/explore">
                <label>Explore</label>
                <FaSearch style={{ color: "white" }} size={30} />
            </StyledLink>

            <StyledLink to="/dashboard">
                <label>My Recipes</label>
                <FaBook style={{ color: "white" }} size={30} />
            </StyledLink>
            <StyledLink to="/addRecipe">
                <label>Add Recipe</label>
                <MdCreate style={{ color: "white" }} size={30} />
            </StyledLink>
            <StyledLink to="/settings">
                <label>Settings</label>
                <MdSettings style={{ color: "white" }} size={30} />
            </StyledLink>
            <StyledLink
                to="/"
                onClick={() => {
                    dispatch(logout());
                }}
            >
                <label>Logout</label>
                <FaSignOutAlt size={30} style={{ color: "white" }} />
            </StyledLink>
        </Nav>
    );
}
