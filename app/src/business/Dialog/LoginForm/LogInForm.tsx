import * as React from 'react';
import { useState, ChangeEvent, FormEvent } from "react";
import { LoginForm } from "@/interface";
import { useAppDispatch, useAppSelector } from "@/_core/store/store";
import { TextField, Box, Button } from '@mui/material';
import { login } from "@/_core/store/services/auth";


type LogInFormProps = {}

const LogInForm = ({}: LogInFormProps) => {
    const appDispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [initialForm, setInitialForm] = useState<LoginForm>({
        email: '', password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.target.id === 'email'
            ? setInitialForm({ ...initialForm, email: e.target.value })
            : setInitialForm({ ...initialForm, password: e.target.value })
    };

    console.log(initialForm.password);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        appDispatch(login({
            email: initialForm.email,
            password: initialForm.password
        } as LoginForm));
    };

    return (
        <form onSubmit={ handleSubmit }>
            <Box sx={ {
                display: 'flex',
                flexDirection: 'column',
                '& > :not(style)': {
                    mt: 2,
                    mb: 2,
                },
            } }>
                <TextField id="email" label="Email" variant="outlined" type='email'
                           onChange={ handleChange } />
                <TextField id="password" label="Password" variant="outlined" type='password'
                           onChange={ handleChange } />
                <Box
                    display='flex'
                    justifyContent='flex-end'
                >
                    <Button type='submit' variant="contained" disableElevation>Log In</Button>
                </Box>
            </Box>
        </form>
    )
}

export default LogInForm;
