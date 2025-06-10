import { TaskParams } from "../../../shared/types/task-params";

export interface ActionIconsProps {
    taskData: TaskParams;
    onRemoveButtonClick(): void;
}