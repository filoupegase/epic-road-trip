import * as React from 'react';
import { useState, ChangeEvent } from "react";
import { LoginForm } from "@/interface";
import { TextField, Box, Button } from '@mui/material';


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
                 flexDirection: 'column',
                 '& > :not(style)': {
                     mt: 2,
                     mb: 2,
                 },
             } }>
            <TextField id="email" label="Email" variant="outlined" type='email' onChange={ handleChange } />
            <TextField id="password" label="Password" variant="outlined" type='password' onChange={ handleChange } />
            <Box
                display='flex'
                justifyContent='flex-end'
            >
                <Button type='submit' variant="contained" disableElevation>Log In</Button>
            </Box>
        </Box>
    )
}

export default LogInForm;
