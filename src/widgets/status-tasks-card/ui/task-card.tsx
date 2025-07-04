import React, { useState } from "react";

import { Card, CardContent, CardHeader } from "@mui/material";
import styles from './task-card.module.css';
import { removeTaskEvent } from '../../../entities/tasks';
import { getTaskCardBackgroundColor } from "../utils";
import { TaskCardTitle } from "./task-card-title";
import { RemoveTaskModal } from "../../../features/remove-task-modal";
import { TaskCardProps } from "../types";
import { getTaskCardFields } from "../../../entities/tasks/utils";

const CardHeaderStyles = {
  padding: '2px 2px 5px 2px',
};

const CardContentStyles = {
  padding: '2px',
};

export const TaskCard = (props: TaskCardProps): React.ReactElement => {
  const { taskData } = props;

  const [isRemoveTaskModalVisible, setIsRemoveTaskModalVisible] = useState<boolean>(false);

  const TaskStyles = {
    backgroundColor: getTaskCardBackgroundColor(taskData.status),
    padding: '15px 15px 0px 15px',
    width: '250px',
  }

  const taskTitle: React.ReactElement = (
    <TaskCardTitle
      taskData={taskData}
      onRemoveButtonClick={(): void => setIsRemoveTaskModalVisible(true)}
    />
  );

  const handleRemoveTask = (): void => {
    removeTaskEvent(taskData.id);
    setIsRemoveTaskModalVisible(false);
  };

  const taskFields = getTaskCardFields(taskData);

  return (
    <div className={styles['task-card']}>
      <Card
        sx={TaskStyles}
      >
        <CardHeader
          sx={CardHeaderStyles}
          title={taskTitle}
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
      <RemoveTaskModal
        isVisible={isRemoveTaskModalVisible}
        taskTitle={taskData.title}
        onClose={(): void => setIsRemoveTaskModalVisible(false)}
        onConfirm={handleRemoveTask}
      />
    </div>
  );
};