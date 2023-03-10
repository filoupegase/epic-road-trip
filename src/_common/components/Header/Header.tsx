import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Button } from '@mui/material';


const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);


    const handleClickLogin = () => {
        setOpen(true);
        setValue(0);
    };

    const handleClickSignUp = () => {
        setOpen(true);
        setValue(1);
    };


    return (
        <>
            <Wrapper>
                <Nav>
                    <Box>
                        <Button sx={ { mr: 1 } } onClick={ handleClickLogin } variant='outlined'>Login</Button>
                        <Button variant='contained' onClick={ handleClickSignUp } disableElevation>Sign Up</Button>
                    </Box>
                </Nav>
            </Wrapper>
            { open && <p>salut</p> }
        </>
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
