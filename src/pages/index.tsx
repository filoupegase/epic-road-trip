import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function Home() {
    return (
        <Paper
            component="form"
            elevation={ 3 }
            sx={ { p: '5px 4px', display: 'flex', alignItems: 'center', width: 400 } }
        >
            <IconButton sx={ { p: '10px' } } aria-label="menu">
                <SearchIcon color='primary' />
            </IconButton>
            <InputBase
                sx={ { ml: 1, flex: 1 } }
                placeholder="Where to?"
                inputProps={ { 'aria-label': 'search google maps' } }
            />
        </Paper>
    )
}
