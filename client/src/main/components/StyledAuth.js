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
    margin: 0 auto;
    @media ${device.small}, ${device.medium}, ${device.large} {
        display: none;
    }
`;

export const Img = styled.img`
    width: 75%;
    object-fit: contain;
`;

export const Title = styled.h1`
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.large};
    }
`;
export const Check = styled.h3`
    @media ${device.small} {
        font-size: ${(props) => props.theme.fontSizes.small};
    }
`;
