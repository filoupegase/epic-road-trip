import React, { useState } from 'react';
import { Menu, MenuItem, Divider, ListItemIcon, Box, Typography, IconButton } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { useAppDispatch } from "@/_core/store/store";
import { logout } from "@/_core/store/services/auth";
import Link from 'next/link'
import Person from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';


const AvatarProfile = () => {
    const appDispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                color='primary'
                onClick={ handleClick }
                size='small'
                aria-controls={ anchorEl ? 'account-menu' : undefined }
                aria-haspopup='true'
                aria-expanded={ anchorEl ? 'true' : undefined }
            >
                <AccountCircleOutlinedIcon sx={ { fontSize: 35 } } />
            </IconButton>
            <Menu
                anchorEl={ anchorEl }
                id="account-menu"
                open={ open }
                onClose={ handleClose }
                onClick={ handleClose }
                PaperProps={ {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                } }
                transformOrigin={ { horizontal: 'right', vertical: 'top' } }
                anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
            >
                <MenuItem>
                    <AccessibilityNewIcon sx={ { fontSize: 60, mr: 2 } } />
                    <Box>
                        <Typography variant='h6'>Myriem</Typography>
                        <Typography variant='body2'>Myriemajarouche@gmil.com</Typography>
                    </Box>
                </MenuItem>
                <Divider />
                <Link href="#">
                    <MenuItem>
                        <ListItemIcon>
                            <Person fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                </Link>
                <MenuItem onClick={ () => {
                    appDispatch(logout())
                    window.location.reload();
                } }>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default AvatarProfile;
