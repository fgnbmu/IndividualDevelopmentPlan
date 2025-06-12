import { StatusClassMap } from "../../types";
import styles from '../../ui/tasks-by-date-list.module.css';

export const STATUS_CLASS_MAP: StatusClassMap = {
  active: styles["task-by-date-card__status--active"],
  closed: styles["task-by-date-card__status--closed"],
  scheduled: styles["task-by-date-card__status--scheduled"]
};