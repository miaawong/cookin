import styled from "styled-components";
import { device } from "../../Theme";
export const Main = styled.div`
    font-family: ${(props) => props.theme.font};
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 4rem;
    @media ${device.laptop}, ${device.wide} {
        margin: ${({ loggedIn }) => (loggedIn ? " 0 0 0 4rem " : "0 auto")};
        width: 90%;
    }

    flex-wrap: wrap;
    justify-content: start;
`;
