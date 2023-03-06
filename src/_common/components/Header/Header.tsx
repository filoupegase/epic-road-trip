import * as React from "react";
import { styled, Box, Button } from '@mui/material';


const Header = () => {
    return (
        <Wrapper>
            <Nav>
                <Box>
                    <Button variant='outlined'>Login</Button>
                    <Button variant='contained' disableElevation>Sign Up</Button>
                </Box>
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
        justifyContent: "flex-end",
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
    })
);

export default Header;
