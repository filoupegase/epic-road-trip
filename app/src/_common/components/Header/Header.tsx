import React, { useState, PropsWithChildren, SyntheticEvent } from 'react';
import { Box, Button, DialogContent, Tabs, Tab } from '@mui/material';
import styled from "styled-components";
import DialogLayout from "@/_common/components/Dialog/DialogLayout";
import LogInForm from '@/business/Dialog/LoginForm';
import SignUpForm from "@/business/Dialog/SignUpForm";


type TabPanelProps = PropsWithChildren<{
    index: number;
    value: number;
}>

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <Box
            role="tabpanel"
            hidden={ value !== index }
            id={ `simple-tabpanel-${ index }` }
            aria-labelledby={ `simple-tab-${ index }` }
        >
            { value === index && (
                <Box sx={ { pt: 3, pb: 3 } }>
                    { children }
                </Box>
            ) }
        </Box>
    );
}

const Header = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
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
                            <StyledTab label="Log In" />
                            <StyledTab label="Sign Up" />
                        </Tabs>
                        <TabPanel value={ value } index={ 0 }>
                            <LogInForm />
                        </TabPanel>
                        <TabPanel value={ value } index={ 1 }>
                            <SignUpForm />
                        </TabPanel>
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
