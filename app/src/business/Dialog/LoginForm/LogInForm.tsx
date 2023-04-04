import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { LoginForm } from "@/interface";
import { useAppDispatch, useAppSelector } from "@/_core/store/store";
import { TextField, Box, Button } from '@mui/material';
import { login } from "@/_core/store/services/auth";


type LogInFormProps = {}

const LogInForm = ({}: LogInFormProps) => {
    const appDispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.auth);
    const [inputError, setInputError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');
    const [initialForm, setInitialForm] = useState<LoginForm>({
        email: '', password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.target.id === 'email'
            ? setInitialForm({ ...initialForm, email: e.target.value })
            : setInitialForm({ ...initialForm, password: e.target.value })
        setInputError(false);
        setHelperText('');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        appDispatch(login({
            email: initialForm.email,
            password: initialForm.password
        } as LoginForm));
    };

    useEffect(() => {
        if (error) {
            setInputError(true);
            // @ts-ignore
            if (error && error.data.message) {
                // @ts-ignore
                setHelperText(error.data.message);
            }
        }
    }, [error]);

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
                <TextField error={ inputError } id="email" label="Email" variant="outlined" type='email'
                           onChange={ handleChange } />
                <TextField
                    helperText={ helperText }
                    error={ inputError } id="password"
                    label="Password" variant="outlined" type='password'
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
