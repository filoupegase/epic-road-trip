import * as React from "react";
import { styled } from '@mui/material';


const Header = () => {
    return (
        <Wrapper>
            <Nav>
                <p>header ici</p>
            </Nav>
        </Wrapper>
    )
}

const Wrapper = styled('header')(() => ({
        width: "100%",
        height: "4.5em",
        padding: "0.7em 1.5em",
        borderBottom: `1px solid #e3e3e3`,
        backgroundColor: "#fdfdfd",
        //transition: `background ${theme.transitions.fade}, border ${theme.transitions.fade}`,
        zIndex: 9999,

        backdropFilter: "saturate(180%) blur(5px)",
        "@medium": {
            padding: "0.75em 1.25em",
            height: "5.9em",
        },
    })
);

const Nav = styled('nav')(() => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
    })
);

export default Header;
