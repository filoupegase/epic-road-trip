import React, { useState } from 'react';
import { Box, Button, DialogContent, styled, Tabs, Tab } from '@mui/material';
import DialogLayout from "@/_common/components/Dialog/DialogLayout";


const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClickLogin = () => {
        setOpen(!open);
        setValue(0);
    };

    const handleClickSignUp = () => {
        setOpen(!open);
        setValue(1);
    };

    return (
        <>
            <Wrapper component='header'>
                <Nav component='nav'>
                    <Box>
                        <Button sx={ { mr: 1 } } onClick={ handleClickLogin } variant='outlined'>Login</Button>
                        <Button variant='contained' onClick={ handleClickSignUp } disableElevation>Sign Up</Button>
                    </Box>
                </Nav>
            </Wrapper>
            { open &&
                <DialogLayout onClose={ handleClickLogin } open={ open }>
                    <DialogContent>
                        <Tabs value={ value } onChange={ handleChange } centered>
                            <StyledTab label="Login" />
                            <StyledTab label="Sign Up" />
                        </Tabs>
                    </DialogContent>
                </DialogLayout>
            }
        </>
    )
}

const Wrapper = styled(Box)(() => ({
        width: "100%",
        height: "4.5em",
        padding: "0.7em 4.7em",
        borderBottom: `1px solid #e3e3e3`,
        backgroundColor: "#fdfdfd",
        zIndex: 9999,
        display: 'flex'
    })
);

const Nav = styled(Box)(() => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        margin: "0 auto",
    })
);

// @ts-ignore
const StyledTab = styled(Tab)(() => ({
        fontSize: 20,
        fontWeight: 600,
        textTransform: 'none',
    })
);

export default Header;
