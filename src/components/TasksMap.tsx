import React from "react";
import { ChangeEvent } from "react";
import { CheckType, TaskType } from "../App";



type TaskMapType = {
    tasks : Array<TaskType>
    todoListID: string
    removeTask: (taskId: string, todoListID:string) => void
    changeTaskStatus: (check: CheckType, taskId: string, todoListID: string) => void
}

const TasksMap = (props:TaskMapType) => {

    return <div>{
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
            <button onClick={onClickHandler}>x</button>
        </li>
    })}

</div>
}

export default TasksMap;