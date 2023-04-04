import React, { useState, PropsWithChildren, SyntheticEvent, useEffect } from 'react';
import { Box, Button, DialogContent, Tabs, Tab } from '@mui/material';
import styled from "styled-components";
import { useAppSelector } from "@/_core/store/store";
import DialogLayout from "@/_common/components/Dialog/DialogLayout";
import AvatarProfile from "@/_common/components/AvatarProfile";
import LogInForm from '@/business/Dialog/LoginForm';
import SignUpForm from "@/business/Dialog/SignUpForm";


const Header = () => {
    const { success, userToken } = useAppSelector((state) => state.auth);
    const [open, setOpen] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClickOpenLoginDialog = () => {
        setOpen(!open);
        setValue(0);
    };

    const handleClickOpenSignUpDialog = () => {
        setOpen(!open);
        setValue(1);
    };

    useEffect(() => {
        if (success) {
            setOpen(false);
        }
    }, [success]);

    useEffect(() => {
        if (userToken) {
            setIsLogged(true);
        }
    }, [userToken]);

    return (
        <>
            <Wrapper component='header'>
                <Nav component='nav'>
                    <Box>
                        { isLogged &&
                            <AvatarProfile />
                        }
                        { !isLogged &&
                            <>
                                <Button sx={ { mr: 1 } } onClick={ handleClickOpenLoginDialog }
                                        variant='outlined'>
                                    Login
                                </Button>
                                <Button variant='contained' onClick={ handleClickOpenSignUpDialog } disableElevation>
                                    Sign Up
                                </Button>
                            </>
                        }
                    </Box>
                </Nav>
            </Wrapper>
            {
                open &&
                <DialogLayout onClose={ handleClickOpenLoginDialog } open={ open }>
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

export default Header;

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
