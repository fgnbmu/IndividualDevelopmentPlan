import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { TaskModalProps } from "../types";

export const TaskModal = (props: TaskModalProps): React.ReactElement => {
    const { isVisible, taskData, onClose } = props;

    return (
        <Dialog open={isVisible} onClose={onClose}>
            <DialogTitle>{taskData.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {taskData.title}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
