import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pasta from "../images/Creamy-Salmon-Pasta-with-Spinach-2.jpg";
import { device } from "../Theme";
import { Main } from "../main/components/StyledMain";

const Box = styled.div`
    display: flex;
    background: white;
    border: 5px solid black;
    justify-content: center;
    align-content: center;
    height: 75%;
    width: 90%;
    margin: 0 auto;
    align-items: center;

    @media ${device.small}, ${device.medium} {
        flex-direction: column;
        border: none;
        margin: 0;
        width: 100%;
        position: fixed;
        top: 7rem;
    }
    @media ${device.large}, ${device.ipad} {
        flex-direction: column;
        border: none;
        margin: 0;
        width: 100%;
        top: 7rem;
        position: fixed;
    }
`;

const StyledMain = styled(Main)`
    height: 80%;
    width: ${(JWToken) => (JWToken === " " ? "97%" : "100%")};
    margin: 0;
`;
const MainText = styled.div`
    font-family: ${(props) => props.theme.font};
    background: white;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    align-content: center;
    padding: 2rem;

    @media ${device.small}, ${device.medium}, ${device.large}, ${device.ipad} {
        padding: 1rem;
        width: 100%;
        position: fixed;
        bottom: 4rem;
        height: 29%;
        background: #ffda0b;
    }
    @media ${device.medium} {
        padding: 1rem 2rem;
    }
    @media ${device.large} {
        height: 35%;
        padding: 3rem 2rem;
    }
    @media ${device.ipad} {
        font-size: ${(props) => props.theme.fontSizes.large};
        bottom: 11rem;
        height: 23%;
        padding: 3rem 2rem;
    }
`;

const StyledLink = styled(Link)`
    font-size: ${(props) => props.theme.fontSizes.large};
    font-weight: 600;
    text-decoration: none;
    width: 10rem;
    color: black;
    background: ${(props) => props.theme.colors.yellow};
    padding: 0.5rem;
    margin: 2rem auto;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    & > label {
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    @media ${device.small}, ${device.medium}, ${device.large}, ${device.ipad} {
        font-size: ${(props) => props.theme.fontSizes.small};
        margin: 1.5rem auto 0 auto;
        background: black;
        color: white;
    }
    @media ${device.medium}, ${device.large}, ${device.ipad} {
        font-size: ${(props) => props.theme.fontSizes.medium};
        margin: 0 auto;
    }
`;
const Yellow = styled.div`
    background: #ffda0b;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${device.small} {
        width: 100%;
        background: white;
        height: 100%;
        justify-content: initial;
        align-items: initial;
    }
    @media ${device.medium} {
        width: 100%;
        background: white;
        height: 100%;
        justify-content: initial;
        align-items: initial;
    }
    @media ${device.large} {
        width: 100%;
        background: white;
        height: 100%;
        justify-content: initial;
        align-items: initial;
    }
`;
const MainImg = styled.img`
    width: 90%;
    object-fit: cover;
    @media ${device.small} {
        width: 100%;
        height: 51%;
        position: fixed;
        top: 13%;
    }
    @media ${device.medium}, ${device.large}, ${device.ipad} {
        width: 100%;
        height: 56%;
        position: fixed;
        top: 10%;
    }
    @media ${device.large}, ${device.ipad} {
        top: 9%;
    }

    @media ${device.laptop}, ${device.wide} {
        max-height: 80%;
    }
`;
const Text = styled.p`
    font-size: ${(props) => props.theme.fontSizes.large};
    margin: 0em;
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
        text-align: center;
        margin: 0.2em;
    }
    @media ${device.medium}, ${device.large}, ${device.ipad} {
        text-align: center;
        font-size: ${(props) => props.theme.fontSizes.medium};
        margin: 0.1em;
    }
`;
export default function Home({ JWToken }) {
    return (
        <StyledMain JWToken={JWToken}>
            <Box>
                <MainText>
                    <Text>What's cookin' for dinner? </Text>
                    <Text>Get inspired, </Text>
                    <Text>Store your recipes,</Text>
                    <Text>All in one place.</Text>
                    <div style={{ width: "100%" }}>
                        <StyledLink to="/explore">
                            <label>Recipes</label>
                        </StyledLink>
                    </div>
                </MainText>

                <Yellow>
                    <MainImg src={pasta} alt="pasta" />
                </Yellow>
            </Box>
        </StyledMain>
    );
}
