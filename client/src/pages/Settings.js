import React from "react";
import ramen from "../images/ramen.png";
import { Main } from "../main/components/StyledMain";

export default function Settings() {
    return (
        <Main>
            <div
                style={{
                    fontFamily: `${(props) => props.theme.font}`,
                    width: "90%",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <img src={ramen} alt="Ramen image" style={{ width: "50%" }} />

                <h1
                    style={{
                        fontFamily: "Roboto",
                    }}
                >
                    Under construction.....
                </h1>
            </div>
        </Main>
    );
}
