import styled from "styled-components";
import { device } from "../../../Theme";

export const Main = styled.div`
    font-family: ${(props) => props.theme.font};
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
    @media ${device.laptop} {
        width: ${({ JWToken }) => (JWToken ? "96%" : "100%")};
    }

    @media ${device.wide} {
        width: ${({ JWToken }) => (JWToken ? "97%" : "100%")};
    }
    @media ${device.small}, ${device.medium}, ${device.large} {
        height: auto;
    }
`;
export const Description = styled.div`
    height: auto;
    width: 75%;
    margin: 0 auto;
    font-size: ${(props) => props.theme.fontSizes.small};
    padding: 1rem;
    background: ${(props) => props.theme.colors.yellow};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media ${device.ipad}, ${device.laptop}, ${device.wide} {
        font-size: ${(props) => props.theme.fontSizes.medium};
        padding: 2rem;
    }
    @media ${device.small}, ${device.medium} {
        width: 100%;
    }
`;
export const Bottom = styled.div`
    height: auto;
    width: 75%;
    margin: 0 auto;
    align-self: center;
    padding: 1rem;
    font-size: ${(props) => props.theme.fontSizes.small};
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > p {
        margin: 0.5rem 0;
    }
    @media ${device.ipad}, ${device.laptop}, ${device.wide} {
        padding: 2rem;
        font-size: ${(props) => props.theme.fontSizes.medium};
    }
    @media ${device.small}, ${device.medium} {
        width: 100%;
    }
`;

export const ImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 65%;
    justify-content: center;
    position: relative;
    @media ${device.small} {
        height: 25rem;
    }
    @media ${device.medium}, ${device.large} {
        height: 30rem;
    }
`;
export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Button = styled.button`
    background: none;
    padding: 0.5rem;
    border: none;
`;
export const RecipeName = styled.h1`
    display: flex;
    justify-content: center;
    text-align: center;
    font-weight: 800;
    font-size: ${(props) => props.theme.fontSizes.XL};
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.large};
    }
    @media ${device.small}, ${device.medium}, ${device.large}, ${device.ipad} {
        text-align: center;
    }
`;
export const Category = styled.h2`
    margin: 1rem 0 0.5rem 0;
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: 600;
`;
export const BottomDesc = styled.div`
    margin: 2rem 0 0 0;
    & > div > p {
        margin: 0;
        font-weight: 600;
        font-size: ${(props) => props.theme.fontSizes.small};
    }
    & > ul {
        margin: 0 auto;
    }
`;
export const FavoriteBtn = styled.button`
    background: rgba(255, 255, 255, 0.8);
    padding: 2px 4px 0px 4px;
    border-radius: 8px;
    position: absolute;
    top: 1rem;
    right: ${({ JWToken }) => (JWToken ? "2rem" : "0.5rem")};
    @media ${device.small}, ${device.medium}, ${device.large} {
        right: 0.5rem;
    }
    border: none;
`;
export const Modification = styled.div`
    display: flex;
    position: relative;
    justify-content: flex-end;
`;
export const DeleteModalContainer = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    z-index: 1;
    display: flex;
    align-items: center;
`;
export const DeleteModal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
    z-index: 1;
    width: 60%;
    background: white;
    color: black;
    border-radius: 5px;
    margin: 0 auto;
    font-size: ${(props) => props.theme.fontSizes.medium};
    padding: 1rem;
    @media ${device.small} {
        width: 100%;
    }
`;
export const DeleteBtn = styled.button`
    padding: 0.5rem;
    color: white;
    background: black;
    border: none;
    border-radius: 8px;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.medium};
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
    }
`;
export const DeleteRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`;
