import { TaskParams } from "../../../shared/types/task-params";

export interface TaskModalProps {
    taskData: TaskParams;
    onClose: () => void;
    isVisible: boolean;
}