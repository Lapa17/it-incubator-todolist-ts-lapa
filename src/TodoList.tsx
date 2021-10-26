import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import {FilterValuesType, TaskType} from "./App";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskID: string) => void
    changeFilter:(filter: FilterValuesType) => void
    addTask:(title:string) => void
}

const TodoList:React.FC<TodoListPropsType> = (props) => {

    const tasksJSXelements = props.tasks.map( task => {
        const onRemoveHandler = ()=>props.removeTask(task.id)

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        )
    }
    )
    const [newTaskTitle, setNewTaskTitle] = useState('')
   
    const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setNewTaskTitle(e.currentTarget.value)
        }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'){
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
        
    }
    const addTask =() => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
        }
    const onAllClickHandler = ()=>props.changeFilter('all');
    const onActiveClickHandler = ()=>props.changeFilter('active')
    const onCompletedClickHandler = ()=>props.changeFilter('completed')
    return(
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input onChange={onNewTitleChangeHandler} value={newTaskTitle}
                    onKeyPress={onKeyPressHandler}
                    
                    />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSXelements}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;