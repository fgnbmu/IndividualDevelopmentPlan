import { useNavigate } from "react-router-dom";

import { IconButton, Tooltip } from "@mui/material"
import { TaskStatuses } from "../../../shared/types"
import { AddBoxRounded } from "@mui/icons-material"
import styles from './status-tasks-card.module.css';
import { StatusTasksCardTitleProps } from "../types";
import { TASK_STATUSES_OPTIONS } from "../../../shared/lib/constants";

export const StatusTasksCardTitle = (props: StatusTasksCardTitleProps): React.ReactElement => {
  const { status } = props;

  const navigateTo = useNavigate();

  return (
    <div className={styles['status-tasks-card__title']}>
      {status}
      {status === TASK_STATUSES_OPTIONS.scheduled && (
        <Tooltip title="Добавить задачу">
          <IconButton color="primary" onClick={() => navigateTo("/task/new")}>
            <AddBoxRounded fontSize="medium" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  )
}