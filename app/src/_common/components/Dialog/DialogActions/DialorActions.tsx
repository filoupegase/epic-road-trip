import React, { PropsWithChildren } from 'react';
import { DialogActions as MuiDialogActions } from "@mui/material";


const DialogActions = ({ children }: PropsWithChildren) => {
    return (
        <MuiDialogActions>
            { children }
        </MuiDialogActions>
    );
};

export default DialogActions;
