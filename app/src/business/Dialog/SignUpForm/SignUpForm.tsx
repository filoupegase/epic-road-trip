import * as React from 'react';
import { ChangeEvent, useState } from "react";
import { SignupForm } from "@/interface";


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
        e.target.id === initialForm.password
            ? setInitialForm({ ...initialForm, password: e.target.value })
            : setInitialForm({ ...initialForm, passwordCheck: e.target.value })
    };

    return (
        <>  </>
    );
}

export default SignUpForm;
