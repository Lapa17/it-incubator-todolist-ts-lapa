import React from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskID: number) => void
    changeFilter:(filter: FilterValuesType) => void
}

const TodoList:React.FC<TodoListPropsType> = (props) => {

    const tasksJSXelements = props.tasks.map( task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                <button onClick={()=>props.removeTask(task.id)}>x</button>
            </li>
        )
    }
    

    )

    return(
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSXelements}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;