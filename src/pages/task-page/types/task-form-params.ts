import { TaskParams } from "../../../shared/types/task-params";

export type TaskFormParams = Omit<TaskParams, 'id'>;