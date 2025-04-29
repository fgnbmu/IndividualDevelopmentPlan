import { useNavigate } from "react-router-dom";

import { IconButton, Tooltip } from "@mui/material"
import { TaskStatuses } from "../../../shared/types"
import { AddBoxRounded } from "@mui/icons-material"
import styles from './status-tasks-card.module.css';
import { StatusTasksCardTitleProps } from "../types";

export const StatusTasksCardTitle = (props: StatusTasksCardTitleProps): React.ReactElement => {
  const { statusTitle } = props;

  const navigateTo = useNavigate();

  return (
    <div className={styles['status-tasks-card__title']}>
      {statusTitle}
      {statusTitle === TaskStatuses.Scheduled && (
        <Tooltip title="Добавить задачу">
          <IconButton color="primary" onClick={() => navigateTo("/task")}>
            <AddBoxRounded fontSize="large" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  )
}