import * as React from "react";
import styled from 'styled-components';
import { Box, Button } from '@mui/material';


const Header = () => {
    return (
        <Wrapper>
            <Nav>
                <Box>
                    <Button sx={ { mr: 2 } } variant='outlined'>Login</Button>
                    <Button variant='contained'>Sign Up</Button>
                </Box>
            </Nav>
        </Wrapper>
    )
}

const Wrapper = styled('header')(() => ({
        width: "100%",
        height: "4.5em",
        padding: "0.7em 4.7em",
        borderBottom: `1px solid #e3e3e3`,
        backgroundColor: "#fdfdfd",
        zIndex: 9999,
        display: 'flex'
    })
);

const Nav = styled('nav')(() => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        margin: "0 auto",
    })
);

export default Header;
