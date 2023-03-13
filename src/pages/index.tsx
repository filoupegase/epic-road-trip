import { FormEvent } from "react";
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function Home() {

    const handleSubmit = (e: FormEvent) => {

    }

    return (
        <Paper
            component="form"
            elevation={ 3 }
            sx={ {
                borderRadius: 15,
                p: '7px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: "100%"
            } }>
            <IconButton onClick={ handleSubmit } sx={ { p: '10px', mr: 1 } } aria-label="menu">
                <SearchIcon color='primary' />
            </IconButton>
            <InputBase
                sx={ { ml: 1, flex: 1 } }
                placeholder="Where to?"
                inputProps={ { 'aria-label': 'search google maps' } }
                fullWidth
            />

        </Paper>
    )
};
