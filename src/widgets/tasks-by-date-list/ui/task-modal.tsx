import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { TaskModalProps } from "../types";
import { Close, Edit } from "@mui/icons-material";
import styles from './task-modal.module.css';
import { USERS_MOCK_DATA } from "../../../entities/users";
import { useNavigate } from "react-router-dom";
import { getTaskCardFields } from "../../../shared/lib/utils";

const DialogTitleStyles = {justifyContent: 'space-between', display: 'flex', fontSize: '18px'};
const EditIconStyles = {color: 'var(--main-color)'};
const CloseIconStyles = {fontSize: '22px'};

export const TaskModal = (props: TaskModalProps): React.ReactElement => {
    const { isVisible, taskData, onClose } = props;
    const taskFields = getTaskCardFields(taskData);
    const user = USERS_MOCK_DATA.find(user => user.id === taskData.creator);
    const navigateTo = useNavigate();

    return (
        <Dialog open={isVisible} onClose={onClose}>
            <DialogTitle sx={DialogTitleStyles}>
                {taskData.title}
                <div className={styles['task-modal__header-icons']}>
                    <Tooltip title="Редактировать" >
                        <IconButton 
                            onClick={() => navigateTo(`/task/${taskData.id}`)}
                        >
                            <Edit sx={EditIconStyles}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Закрыть">
                        <IconButton onClick={onClose}><Close sx={CloseIconStyles}/></IconButton>
                    </Tooltip>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className={styles['task-modal__fields']}>
                    {taskFields.map((field, index) => (
                    <div className={styles['task-modal__field']} key={index}>
                        <div className={styles['task-modal__field-name']}>{field.name}:</div>
                        <div className={styles['task-modal__field-value']}>{field.value}</div>
                    </div>
                    ))}
                    <div className={styles['task-modal__field']}>
                        <div className={styles['task-modal__field-name']}>Комментарий:</div>
                        <div className={styles['task-modal__field-value']}>{taskData.comment || "Нет"}</div>
                    </div>
                    <div className={styles['task-modal__field']}>
                        <div className={styles['task-modal__field-name']}>Последний редактор:</div>
                        <div className={styles['task-modal__field-value']}>{user?.name || "Неизвестно"}</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
