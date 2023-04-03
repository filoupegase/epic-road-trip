import { Box, Typography, Divider, Link, Button as MuiButton } from '@mui/material';
import styled from 'styled-components';
import FaceIcon from '@mui/icons-material/Face';
import EditIcon from '@mui/icons-material/Edit';


type ButtonBasicIconProps = {
    label: string;
    icon: JSX.Element
}

const ButtonBasicIcon = ({ label, icon }: ButtonBasicIconProps) => {
    return (
        <CustomBasicButton
            startIcon={ icon }
        >
            { label }
        </CustomBasicButton>
    )
};


const Profile = () => {
    return (
        <>
            <Box>
                <Box sx={ { pt: 1, pb: 2 } }>
                    <Typography variant='h5'>Profile Info</Typography>
                </Box>
                <Divider />
                <Box sx={ {
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                } }>
                    <Box sx={ { pt: 2, pb: 2, display: 'flex', alignItems: 'center' } }>
                        <Box sx={ { mr: 2 } }>
                            <FaceIcon sx={ { fontSize: 100 } } />
                        </Box>
                        <Box>
                            <Typography variant='h6'>@Meryem Ben Jouda</Typography>
                            <Typography variant='body2'>meryem2.ben-jouda@epitech.eu</Typography>
                        </Box>
                    </Box>
                    <Link href={ '/' }>
                        <ButtonBasicIcon
                            icon={
                                <EditIcon
                                    sx={ (theme) => ({
                                        color: theme.palette.grey[600]
                                    }) } /> }
                            label='Edit'
                        />
                    </Link>
                </Box>
            </Box>
        </>
    )
}

const CustomBasicButton = styled(MuiButton)(({ theme }) => ({
        '&:hover': {
            color: theme.palette.primary.main,
            border: `solid 1px ${ theme.palette.grey[200] }`
        },
        border: `solid 1px ${ theme.palette.grey[300] }`,
        fontWeight: 400,
        background: 'transparent',
        color: 'black',
        padding: "6px 16px",
        fontSize: '0.875rem',
        textTransform: 'capitalize'
    })
);

export default Profile;
