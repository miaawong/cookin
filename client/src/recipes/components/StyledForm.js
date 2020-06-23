import styled from "styled-components";
import { device, theme } from "../../Theme";

export const ProgressLabel = styled.h1`
    text-align: center;
    background: ${(props) => props.theme.colors.yellow};
    width: 15rem;
    margin: 0.5rem auto;
    font-size: ${(props) => props.theme.fontSizes.XL};
`;

//login and signup
export const Main = styled.div`
    display: flex;
    flex-direction: column;

    width: 80%;
    height: 70%;
    font-family: ${(props) => props.theme.font};
    margin: 2rem auto;
    text-align: left;
`;

export const StyledForm = styled.form`
    width: 80%;
    height: 100%;
    margin: 0 auto;
    font-family: ${(props) => props.theme.font};
    font-size: ${theme.fontSizes.medium};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-content: flex-start;
    overflow: auto;
    @media ${device.laptop}, ${device.wide} {
        margin: 0 auto 0 6rem;
    }

    & > p {
        margin: 0;
        padding: -1rem 0 0 0;
        font-size: 16px;
        color: #ff0000;
    }
    & > div {
        margin: 0.5rem 0;
    }
`;
export const TextInput = styled.input`
    border-radius: 8px;
    font-size: ${(props) => props.theme.fontSizes.medium};
    margin: 0.5rem 0;
    width: 100%;
    height: 3rem;
    padding: 0.5rem;
    border: 1px solid black;
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
        height: 2rem;
    }
`;
export const TextArea = styled.textarea`
    border-radius: 8px;
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-family: ${(props) => props.theme.font};
    margin: 0.5rem 0;
    width: 100%;
    height: 6rem;
    padding: 0.5rem;
    border: 1px solid black;
`;
export const Submit = styled.button`
    font-family: ${(props) => props.theme.font};
    font-size: 26px;
    /* width: 8rem; */
    height: auto;
    background: black;
    color: white;
    padding: 0.5rem;
    float: right;
    border: none;
    border-radius: 8px;
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
    }
`;

export const HourMinute = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ImageUpload = styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: black;
    color: white;
    width: 100%;
    height: 5rem;
    text-align: center;
    @media ${device.laptop}, ${device.wide} {
        height: 15rem;
        font-size: ${(props) => props.theme.fontSizes.medium};
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: ${(props) => props.theme.fontSizes.small};
`;
