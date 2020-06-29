import styled from "styled-components";
import { device } from "../../Theme";
export const Main = styled.div`
    font-family: ${(props) => props.theme.font};
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    @media ${device.laptop}, ${device.wide} {
        margin: ${({ JWToken }) => (JWToken ? " 0 auto 0 2rem " : "0 auto")};
        width: 90%;
        flex-direction: row;
        /* flex: 1; */
    }
    @media ${device.wide} {
        margin: ${({ JWToken }) => (JWToken ? " 0 auto 0 4rem " : "0 auto")};
    }
    @media ${device.medium}, ${device.large} {
        flex-direction: column;
    }

    flex-wrap: wrap;
    justify-content: start;
`;
