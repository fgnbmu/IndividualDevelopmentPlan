import { Paper, Popover, Typography, List, ListItem, Divider, IconButton } from "@mui/material";
import React, { useState } from "react";
import styles from './tasks-by-date-list.module.css';
import { TaskByDateCard } from "./task-by-date-card";
import { FilterAlt } from "@mui/icons-material";
import { PeriodSelector } from "../../period-selector";
import { TasksPeriods } from "../../../shared/types/tasks-periods";
import { getTasksDataByDate } from "../../../shared/lib/utils";

const TasksByDateListPaper = {
    height: '100%',
    borderRadius: '15px',
    boxShadow: 'none',
    padding: '20px',
};

export function TasksByDateList(): React.ReactElement {
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const [selectedPeriod, setSelectedPeriod] = useState(TasksPeriods.Today);
    const { filteredTasks } = getTasksDataByDate(selectedPeriod);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className={styles['tasks-by-date-list']}>
            <Paper sx={TasksByDateListPaper}>
                <div className={styles['tasks-by-date-list__header']}>
                    Задачи
                    <div className={styles['tasks-by-date-list__filter-icon']}>
                      <IconButton onClick={handleClick}>
                        <FilterAlt />
                      </IconButton>
                    </div>
                </div>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <List disablePadding>
                        <ListItem>
                            <Typography>Выбрать период:</Typography>
                            <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
                        </ListItem>
                        <Divider />
                    </List>
                </Popover>
                <div className={styles['tasks-by-date-list__list']}>
                    {filteredTasks.map(task => (
                        <TaskByDateCard key={task.id} taskData={task} />
                    ))}
                </div>
            </Paper>
        </div>
    );
}