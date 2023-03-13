import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
            main: '#000',
        },
        secondary: {
            main: '#3861fb',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize'
                },
            },
        },
        MuiButtonBase: {
            // The props to change the default for.
            defaultProps: {} // No exemple yet 💣!
        }
    }
});

export default theme;
