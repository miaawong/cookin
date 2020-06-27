import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pasta from "../images/Creamy-Salmon-Pasta-with-Spinach-2.jpg";
import { device } from "../Theme";
import { Main } from "../main/components/StyledMain";

const StyledMain = styled(Main)`
    width: ${(JWToken) => (JWToken === " " ? "97%" : "100%")};
    margin: 0;
    position: relative;
    height: 80%;
    overflow: hidden;
    @media ${device.small} {
        flex: 0;
        height: auto;
    }
    @media ${device.medium} {
        height: 88%;
    }
`;
const Box = styled.div`
    display: flex;
    background: white;
    border: 5px solid black;
    justify-content: center;
    height: 80%;
    width: 90%;
    margin: 0 auto;
    align-items: center;
    @media ${device.small} {
        flex-direction: column;
        border: none;
        margin: 0;
        width: 100%;
        position: absolute;
        align-items: flex-start;
        top: 0;
        height: 100%;
    }
`;

const Left = styled.div`
    width: 50%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    @media ${device.small} {
        z-index: 1;
        width: 100%;
        position: fixed;
        bottom: 3rem;
        height: 35%;
        background: #ffda0b;
        padding: 1rem;
    }
`;
const MainText = styled.div`
    font-family: ${(props) => props.theme.font};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    align-content: center;
    padding: 2rem;
    @media ${device.small} {
        padding: 0rem;
        width: 100%;
    }

    @media ${device.ipad} {
        font-size: ${(props) => props.theme.fontSizes.large};
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
    display: flex;
    justify-content: center;
    border-radius: 5px;
    margin: 0 auto;
    box-shadow: 10px 10px 8px -4px rgba(217, 213, 217, 1);
    cursor: pointer;
    & > label {
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
        width: 8rem;
        padding: 0.3rem;
        background: black;
        color: white;
        box-shadow: 10px 10px 8px -4px rgba(51, 49, 51, 1);
    }
    @media ${device.medium}, ${device.large}, ${device.ipad} {
        font-size: ${(props) => props.theme.fontSizes.medium};
        margin: 0 auto;
    }
`;
const Right = styled.div`
    background: #ffda0b;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${device.small} {
        z-index: 0;
        top: 3rem;
        position: fixed;
        width: 100%;
        background: white;
        justify-content: initial;
        align-items: initial;
        overflow: hidden;
    }
`;
const MainImg = styled.img`
    width: 90%;
    object-fit: cover;
    max-height: 80%;
    @media ${device.small} {
        width: 100%;
        max-height: 58%;
        position: absolute;
    }
`;
const Text = styled.p`
    font-size: ${(props) => props.theme.fontSizes.large};
    margin: 0.5rem;
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
        text-align: center;
        margin: 0.3rem;
    }
    @media ${device.medium}, ${device.large}, ${device.ipad} {
        text-align: center;
        font-size: ${(props) => props.theme.fontSizes.medium};
    }
`;
export default function Home({ JWToken }) {
    return (
        <StyledMain JWToken={JWToken}>
            <Box>
                <Left>
                    <MainText>
                        <Text>What's cookin' for dinner? </Text>
                        <Text>Get inspired, </Text>
                        <Text>Store your recipes,</Text>
                        <Text>All in one place.</Text>
                    </MainText>
                    <div style={{ width: "100%" }}>
                        <StyledLink to="/explore">
                            <label>Recipes</label>
                        </StyledLink>
                    </div>
                </Left>

                <Right>
                    <MainImg src={pasta} alt="pasta" />
                </Right>
            </Box>
        </StyledMain>
    );
}
