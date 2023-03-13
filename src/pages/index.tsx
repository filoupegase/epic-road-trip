import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function Home() {
    return (
        <Paper
            component="form"
            elevation={ 3 }
            sx={ {
                borderRadius: 15,
                p: '8px 21px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: "100%"
            } }>
            <InputBase
                sx={ { ml: 1, flex: 1 } }
                placeholder="Where to?"
                inputProps={ { 'aria-label': 'search google maps' } }
                fullWidth
            />
            <IconButton sx={ { p: '10px' } } aria-label="menu">
                <SearchIcon color='primary' />
            </IconButton>
        </Paper>
    )
}
