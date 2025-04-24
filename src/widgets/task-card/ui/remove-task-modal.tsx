import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { RemoveTaskModalProps } from "../types";

export const RemoveTaskModal = (props: RemoveTaskModalProps): React.ReactElement => {
    const { isVisible, taskTitle, onClose, onConfirm } = props;

    return (
        <Dialog open={isVisible} onClose={onClose}>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы действительно хотите удалить задачу "{taskTitle}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Отмена</Button>
                <Button onClick={onConfirm} color="error">Удалить</Button>
            </DialogActions>
        </Dialog>
    );
}
