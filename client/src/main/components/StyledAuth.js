import styled from "styled-components";
import { Main } from "../../recipes/components/StyledForm";
import { device } from "../../Theme";
export const StyledMain = styled(Main)`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    @media ${device.small}, ${device.medium}, ${device.large} {
        flex-direction: column;
    }
`;
export const ImageContainer = styled.div`
    height: 30%;
    width: 50%;
    @media ${device.small} {
        display: none;
    }
    @media ${device.medium}, ${device.large} {
        width: 100%;
    }
    margin: 0 auto;
`;

export const Img = styled.img`
    width: 75%;
    object-fit: contain;
    @media ${device.small}, ${device.medium}, ${device.large} {
        width: 100%;
        height: 100%;
    }
`;

export const Title = styled.h1`
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.large};
        /* margin-bottom: 0;
        padding-bottom: 0; */
    }
`;
export const Check = styled.h3`
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
        margin-top: 0;
        padding-top: 0;
    }
`;
