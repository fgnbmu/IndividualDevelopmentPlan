import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ExitModalProps } from "../types";

const DialogTitleStyles = {fontSize: '16px'};
const DialogContentTextStyles = {fontSize: '14px'};
const DialogButtonsStyles = {fontSize: '12px'};

export const ExitModal = (props: ExitModalProps): React.ReactElement => {
    const { isVisible, onClose, onConfirm } = props;

    return (
        <Dialog open={isVisible} onClose={onClose}>
            <DialogTitle sx={DialogTitleStyles}>Подтверждение выхода</DialogTitle>
            <DialogContent>
                <DialogContentText sx={DialogContentTextStyles}>
                    Вы действительно хотите выйти?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button sx={DialogButtonsStyles} onClick={onClose} color="inherit">Отмена</Button>
                <Button sx={DialogButtonsStyles} onClick={onConfirm} color="error">Выход</Button>
            </DialogActions>
        </Dialog>
    );
}
