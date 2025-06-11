import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ExitModalProps } from "../types";

export const ExitModal = (props: ExitModalProps): React.ReactElement => {
    const { isVisible, onClose, onConfirm } = props;

    return (
        <Dialog open={isVisible} onClose={onClose}>
            <DialogTitle>Подтверждение выхода</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы действительно хотите выйти?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Отмена</Button>
                <Button onClick={onConfirm} color="error">Выход</Button>
            </DialogActions>
        </Dialog>
    );
}
