import styled from "styled-components";
import { device } from "../../Theme";

export const Ingredient = styled.div`
    display: flex;
    flex-wrap: ${({ unit }) =>
        unit && unit.value === "other" ? "wrap" : "no-wrap"};
    justify-content: space-evenly;
    align-items: center;
`;

export const IngredientRow = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    @media ${device.laptop}, ${device.wide} {
        align-items: center;
        flex-direction: row;
    }
`;
export const AddButton = styled.button`
    display: block;
    color: white;
    border: none;
    height: 3rem;
    background-color: #000;
    font-size: ${(props) => props.theme.fontSizes.small};
`;
