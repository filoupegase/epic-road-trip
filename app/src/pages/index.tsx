import { FormEvent, useState, ChangeEventHandler } from "react";
import { useRouter } from 'next/router'
import { Paper, InputBase, IconButton, Stack, Box } from '@mui/material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import CardActionsCategory from "@/_common/components/CardActionsCategory";
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';


interface DataCategory {
    icon: JSX.Element;
    label: string;
}

const dataCardActionsCategory: DataCategory[] = [
    {
        icon: <KingBedOutlinedIcon />,
        label: "Hôtels",
    },
    {
        icon: <LocalActivityOutlinedIcon />,
        label: "Activités",
    },
    {
        icon: <RestaurantMenuOutlinedIcon />,
        label: "Restaurants",
    },
    {
        icon: <MoreHorizOutlinedIcon />,
        label: "Plus",
    },
];

export default function Home() {
    const router = useRouter();
    const [value, setValue] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ value }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (res.status === 201) {
            await router.push(`/post/${ data }`);
        }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <Stack sx={ { mt: 3, mb: 4 } } direction="row" spacing={ 2 }>
                { dataCardActionsCategory.map((el: DataCategory, index) => {
                    return <CardActionsCategory label={ el.label } icon={ el.icon } key={ index } />
                }) }
            </Stack>
            <StyledPaper
                elevation={ 3 }>
                <form onSubmit={ handleSubmit }>
                    <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
                        <IconButton type='submit' sx={ { p: '10px', mr: 1 } } aria-label="menu">
                            <SearchIcon color='primary' />
                        </IconButton>
                        <InputBase
                            placeholder="Where to?"
                            fullWidth
                            onChange={ handleChange }
                            value={ value }
                        />
                    </Box>
                </form>
            </StyledPaper>
        </>
    )
}

const StyledPaper = styled(Paper)(() => ({
    borderRadius: 15,
    padding: '7px 11px',
    display: 'flex',
    width: "100%"
}));
