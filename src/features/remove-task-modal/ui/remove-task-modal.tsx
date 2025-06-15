import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { RemoveTaskModalProps } from "../types";

const DialogTitleStyles = {fontSize: '16px'};
const DialogContentTextStyles = {fontSize: '14px'};
const DialogButtonsStyles = {fontSize: '12px'};

export const RemoveTaskModal = (props: RemoveTaskModalProps): React.ReactElement => {
    const { isVisible, taskTitle, onClose, onConfirm } = props;

    return (
        <Dialog open={isVisible} onClose={onClose}>
            <DialogTitle sx={DialogTitleStyles}>Подтверждение удаления</DialogTitle>
            <DialogContent>
                <DialogContentText sx={DialogContentTextStyles}>
                    Вы действительно хотите удалить задачу "{taskTitle}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button sx={DialogButtonsStyles} onClick={onClose} color="inherit">Отмена</Button>
                <Button sx={DialogButtonsStyles} onClick={onConfirm} color="error">Удалить</Button>
            </DialogActions>
        </Dialog>
    );
}
