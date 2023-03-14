import { FormEvent, useState, ChangeEventHandler } from "react";
import { useRouter } from 'next/router'
import { Paper, InputBase, IconButton, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function Home() {
    const router = useRouter();
    const [value, setValue] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (value.length != 0) {
            //router.push(`/profile`)
        }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    };

    return (
        <StyledPaper
            // @ts-ignore
            component="form"
            elevation={ 3 }>
            <IconButton onClick={ handleSubmit } sx={ { p: '10px', mr: 1 } } aria-label="menu">
                <SearchIcon color='primary' />
            </IconButton>
            <InputBase
                sx={ { ml: 1, flex: 1 } }
                placeholder="Where to?"
                inputProps={ { 'aria-label': 'search google maps' } }
                fullWidth
                onChange={ handleChange }
                value={ value }
            />
        </StyledPaper>
    )
};

const StyledPaper = styled(Paper)(() => ({
    borderRadius: 15,
    padding: '7px 18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%"
}));
