import React, { useState } from "react";

import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import styles from './task-card.module.css';
import { TaskCardProps } from "../types";
import { deleteTaskEvent } from '../../../entities/tasks';
import { getTaskCardBackgroundColor, getTaskCardFields } from "../lib/utils";
import { TaskCardTitle } from "./task-card-title";

export const TaskCard = (props: TaskCardProps): React.ReactElement => {
  const { taskData } = props;

  const [isDeleteTaskModalVisible, setIsDeleteTaskModalVisible] = useState<boolean>(false);

  const CardHeaderStyles = {
    padding: '2px 2px 5px 2px',
  };

  const CardContentStyles = {
    padding: '2px',
  };

  const TaskStyles = {
    backgroundColor: getTaskCardBackgroundColor(taskData.status),
    padding: '8px 10px 0px 10px',
    width: '220px',
  }

  const taskTitle: React.ReactElement = (
    <TaskCardTitle
      taskData={taskData}
      onDeleteButtonClick={() => setIsDeleteTaskModalVisible(true)}
    />
  );

  const handleDeleteTask = (): void => {
    deleteTaskEvent(taskData.id);
    setIsDeleteTaskModalVisible(false);
  };

  const taskFields = getTaskCardFields(taskData);

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