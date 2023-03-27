import * as React from 'react';
import { useState, ChangeEvent } from "react";
import { LoginForm } from "@/interface";
import { TextField, Box } from '@mui/material';


type LogInFormProps = {}

const LogInForm = ({}: LogInFormProps) => {
    const [initialForm, setInitialForm] = useState<LoginForm>({
        email: '', password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.target.id === initialForm.email
            ? setInitialForm({ ...initialForm, email: e.target.value })
            : setInitialForm({ ...initialForm, password: e.target.value })
    };

    return (
        <Box component='form'
             sx={ {
                 display: 'flex',
                 '& > *': {
                     m: 3,
                 },
             } }
        >
            <TextField id="email" label="Email" variant="outlined" type='email' onChange={ handleChange } />
            <TextField id="password" label="Password" variant="outlined" type='password' onChange={ handleChange } />
        </Box>
    )
}

export default LogInForm;
