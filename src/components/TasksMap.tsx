import React, { useState } from "react";
import { ChangeEvent } from "react";
import { CheckType, TaskType } from "../App";
import { SuperButton } from "./SuperButton";
import SuperSpan from "./SuperSpan";
import BackspaceIcon from '@material-ui/icons/Backspace';
import { Checkbox, List, ListItem } from "@material-ui/core";



type TaskMapType = {
    tasks: Array<TaskType>
    todoListID: string
    removeTask: (taskId: string, todoListID: string) => void
    changeTaskStatus: (check: CheckType, taskId: string, todoListID: string) => void
    onNewTaskTitleChange: (title: string, id: string) => void
}

const TasksMap = (props: TaskMapType) => {

    return <ul>{
        props.tasks.map(t => {
            const onClickHandler = () => props.removeTask(t.id, props.todoListID)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(e.currentTarget.checked, t.id, props.todoListID);
            }
            const onNewTaskTitleAdd = (newTitle: string) => {
                props.onNewTaskTitleChange(newTitle, t.id)
            }


            return <List key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox onChange={onChangeHandler}
                    checked={t.isDone} />
                <SuperSpan title={t.title} onTitleChange={onNewTaskTitleAdd} />
                <SuperButton color="primary" onClick={onClickHandler} name={<BackspaceIcon />} />
            </List>
        })}

    </ul>
}

export default TasksMap;


