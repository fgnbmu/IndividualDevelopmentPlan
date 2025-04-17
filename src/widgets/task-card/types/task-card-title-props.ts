import { TaskParams } from "../../../shared/types/task-params";

export interface TaskCardTitleProps {
    taskData: TaskParams;
    onDeleteButtonClick(): void;
}