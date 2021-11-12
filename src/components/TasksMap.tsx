import React from "react";
import { ChangeEvent } from "react";
import { CheckType, TaskType } from "../App";
import { Button } from "./Button";



type TaskMapType = {
    tasks : Array<TaskType>
    todoListID: string
    removeTask: (taskId: string, todoListID:string) => void
    changeTaskStatus: (check: CheckType, taskId: string, todoListID: string) => void
}

const TasksMap = (props:TaskMapType) => {

    return <ul>{
        props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.todoListID)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(e.currentTarget.checked, t.id, props.todoListID);
        }

        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            <span>{t.title}</span>
            <Button onClick={onClickHandler} name={'x'}/>
        </li>
    })}

</ul>
}

export default TasksMap;