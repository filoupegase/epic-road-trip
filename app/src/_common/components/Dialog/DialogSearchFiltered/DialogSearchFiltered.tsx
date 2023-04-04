import React from "react";
import { Dialog, DialogContent, DialogTitle } from '@mui/material';


interface DialogSearchProps {
    open: boolean;
    onClose: () => void;
}

const DialogSearchFiltered = ({ onClose, open }: DialogSearchProps) => {

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Dialog onClose={ handleClose } open={ open }>
                <DialogTitle>Set backup account</DialogTitle>
                <DialogContent>
                    <p>salut</p>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogSearchFiltered;
