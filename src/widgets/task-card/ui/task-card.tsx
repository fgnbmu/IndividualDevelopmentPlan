import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import styles from './task-card.module.css';
import { TaskCardProps } from "../types";
import { TaskStatuses } from "../../../shared/types";
import { ArrowCircleRight, CheckCircle, DeleteOutline, Edit } from "@mui/icons-material";
import { deleteTaskEvent, updateTaskStatusEvent } from '../../../entities/tasks';
import { useUnit } from 'effector-react';

export function TaskCard(props: TaskCardProps): React.ReactElement {
  const { taskData } = props;

  const updateTaskStatus = useUnit(updateTaskStatusEvent);
  const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] = useState<boolean>(false);

  const navigateTo = useNavigate();

  const CardHeaderStyles = {
    padding: '2px 2px 5px 2px',
  };

  const CardContentStyles = {
    padding: '2px',
  };

  const taskTitle: React.ReactElement = (
    <div className={styles['task-card__title']}>
      {taskData.title}
      <div className={styles['task-card__icons']}>
        {(taskData.status === TaskStatuses.Active || taskData.status === TaskStatuses.Scheduled) && (
          <IconButton 
            title="Редактировать" 
            onClick={() => navigateTo(`/task/${taskData.id}`)}
          >
            <Edit />
          </IconButton>
        )}
        {(taskData.status === TaskStatuses.Active) && (
          <IconButton 
            title="Завершить" 
            onClick={() => updateTaskStatus({id: taskData.id, newStatus: TaskStatuses.Closed})}
          >
            <CheckCircle color="primary" />
          </IconButton>
        )}
        {(taskData.status === TaskStatuses.Scheduled) && (
          <IconButton 
            title="Начать" 
            onClick={() => updateTaskStatus({id: taskData.id, newStatus: TaskStatuses.Active})}
          >
            <ArrowCircleRight color="primary" />
          </IconButton>
        )}
        <IconButton
          title="Удалить"
          onClick={(): void => setIsDeleteTaskModalVisible(true)}
        >
          <DeleteOutline />
        </IconButton>
      </div>
    </div>
  );

  const handleDeleteTask = (): void => {
    deleteTaskEvent(taskData.id);
    setIsDeleteTaskModalVisible(false);
  };

  const getBackgroundColor = (status: string): string => {
    switch (status) {
      case TaskStatuses.Closed:
        return '#FFE2E2';
      case TaskStatuses.Active:
        return '#CAFFCD';
      case TaskStatuses.Scheduled:
        return '#D7F1FF';
      default:
        return '#FFFFFF';
    }
  };

  const TaskStyles = {
    backgroundColor: getBackgroundColor(taskData.status),
    padding: '8px 10px 0px 10px',
    width: '220px',
  }

  const taskFields = [
    { name: "Дата", value: taskData.date },
    { name: "Описание", value: taskData.description?.trim() || 'Не указано' },
    { name: "Категория", value: taskData.category?.trim() || 'Не указана' },
    { name: "Ответственный", value: taskData.assignee?.join(', ') || 'Не указан' },
  ];

  return (
    <div>
      <Card
        sx={TaskStyles}
      >
        <CardHeader
          sx={CardHeaderStyles}
          title={taskTitle} // настроить перенос строки
        />
        <CardContent
          sx={CardContentStyles}
        >
          <div className={styles['task-card__content']}>
            {taskFields.map((field, index) => (
              <div className={styles['task-card__field']} key={index}>
                <div className={styles['task-card__field-name']}>{field.name}:</div>
                <div className={styles['task-card__field-value']}>{field.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={isDeleteTaskModalVisible}
        onClose={(): void => setIsDeleteTaskModalVisible(false)}
      >
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы действительно хотите удалить задачу "{taskData.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(): void => setIsDeleteTaskModalVisible(false)} color="inherit">
            Отмена
          </Button>
          <Button onClick={handleDeleteTask} color="error">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};