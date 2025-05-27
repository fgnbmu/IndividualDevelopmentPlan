import { TaskParams } from "../../../shared/types/task-params";

export interface StatusTasksCardProps {
    tasksList: TaskParams[];
    status: string;
}