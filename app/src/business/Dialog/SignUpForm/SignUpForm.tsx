import * as React from 'react';
import { ChangeEvent, FormEvent, useState } from "react";
import { SignupForm } from "@/interface";
import { Button, Box, TextField } from "@mui/material";


type SignUpFormProps = {}

const SignUpForm = ({}: SignUpFormProps) => {
    const [email, setEmail] = useState<string>('')
    const [initialForm, setInitialForm] = useState<SignupForm>({
        email: '', password: '', passwordCheck: ''
    });

    const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.target.id === 'password'
            ? setInitialForm({ ...initialForm, password: e.target.value })
            : setInitialForm({ ...initialForm, passwordCheck: e.target.value })
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
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
                <TextField id="email" label="Email" variant="outlined"
                           type='email' onChange={ handleChangeEmail } value={ email } />

                <TextField id="password" label="Password" variant="outlined" type='password'
                           onChange={ handleChangePassword } />

                <TextField id="passwordCheck" label="Password Check" variant="outlined" type='password'
                           onChange={ handleChangePassword } />
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
