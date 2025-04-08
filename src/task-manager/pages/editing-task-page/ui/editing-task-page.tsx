import React from "react";
import { TaskSettings } from "../../../features/task-settings";

export function EditingTaskPage(): React.ReactElement {
  return (
    <div>
      Редактирование задачи
      <TaskSettings/>
    </div>
  )
};