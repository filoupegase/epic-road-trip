import { FormEvent, useState, ChangeEventHandler } from "react";
import { useRouter } from 'next/router'
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import CardActionsCategory from "@/_common/components/CardActionsCategory";


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
        <>
            <Box sx={ { mb: 3, display: 'flex', flexDirection: 'row' } }>
                <CardActionsCategory label='Hôtels' />
                <CardActionsCategory label='Activités' />
                <CardActionsCategory label='Restaurants' />
                <CardActionsCategory label='Plus' />
            </Box>
            <StyledPaper
                // @ts-ignore
                component="form"
                elevation={ 3 }>
                <IconButton onClick={ handleSubmit } sx={ { p: '10px', mr: 1 } } aria-label="menu">
                    <SearchIcon color='primary' />
                </IconButton>
                <InputBase
                    placeholder="Where to?"
                    inputProps={ { 'aria-label': 'search google maps' } }
                    fullWidth
                    onChange={ handleChange }
                    value={ value }
                />
            </StyledPaper>
        </>
    )
};

const StyledPaper = styled(Paper)(() => ({
    borderRadius: 15,
    padding: '7px 11px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
}));
