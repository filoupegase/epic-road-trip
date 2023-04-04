import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { SignupForm } from "@/interface";
import { Button, Box, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/_core/store/store";
import { Signup } from "@/_core/store/services/register";


type SignUpFormProps = {}

const SignUpForm = ({}: SignUpFormProps) => {
    const appDispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.register);
    const [email, setEmail] = useState<string>('');
    const [inputError, setInputError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');
    const [initialForm, setInitialForm] = useState<SignupForm>({
        email: '', password: '', passwordCheck: ''
    });

    const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
        setInputError(false);
        setHelperText('');
    };

    const handleChangePassword = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.target.id === 'password'
            ? setInitialForm({ ...initialForm, password: e.target.value })
            : setInitialForm({ ...initialForm, passwordCheck: e.target.value })
        setInputError(false);
        setHelperText('');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        appDispatch(Signup({
            email: email,
            password: initialForm.password,
            passwordCheck: initialForm.passwordCheck
        } as SignupForm));
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
                <TextField error={ inputError } id="email" label="Email" variant="outlined"
                           type='email' onChange={ handleChangeEmail } value={ email }
                />

                <TextField error={ inputError } id="password" label="Password" variant="outlined" type='password'
                           onChange={ handleChangePassword }
                />
                <TextField
                    helperText={ helperText }
                    error={ inputError } id="passwordCheck"
                    label="Password Check"
                    variant="outlined"
                    type='password'
                    onChange={ handleChangePassword }
                />
                <Box
                    display='flex'
                    justifyContent='flex-end'
                >
                    <Button type='submit' variant="contained" disableElevation>Sign Up</Button>
                </Box>
            </Box>
        </form>
    );
}

export default SignUpForm;
