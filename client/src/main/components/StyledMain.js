import styled from "styled-components";
import { device } from "../../Theme";
export const Main = styled.div`
    font-family: ${(props) => props.theme.font};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4rem;
    @media ${device.laptop}, ${device.wide} {
        margin: ${({ JWToken }) => (JWToken ? " 0 auto 0 2rem " : "0 auto")};
        width: 90%;
    }
    @media ${device.wide} {
        margin: ${({ JWToken }) => (JWToken ? " 0 auto 0 4rem " : "0 auto")};
    }

    flex-wrap: wrap;
    justify-content: start;
`;
