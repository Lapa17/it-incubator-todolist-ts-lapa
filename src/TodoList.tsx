import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { CheckType, FilterValuesType, TaskType } from "./App";
import { Button } from './components/Button';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeCheked:(check:CheckType)=> void
}

const TodoList = ({ tasks, removeTask, addTask, title, ...props}: TodoListPropsType) => {

    const [filter, setFilter] = useState('all')
    

    const changeFilter = (filter: FilterValuesType) =>{
        setFilter(filter);
    }

    let taskForRender: Array<TaskType> = tasks;

    if(filter === 'active'){
        taskForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed'){
        taskForRender = tasks.filter(t => t.isDone === true)
    }


    const tasksJSXelements = taskForRender.map(task => {
        const onRemoveHandler = () => removeTask(task.id)

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
                <Button onClick={onRemoveHandler} name='x' />
            </li>
        )
    }
    )
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }

    }
    const addTaskHandler = () => {
        if (newTaskTitle) {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const onChangeClickHandler = (value: FilterValuesType) => {
        changeFilter(value)
    };

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input onChange={onNewTitleChangeHandler} value={newTaskTitle}
                    onKeyPress={onKeyPressHandler}

                />
                <Button onClick={addTaskHandler} name='+' />
            </div>
            <ul>
                {tasksJSXelements}
            </ul>
            <div>
                <Button onClick={() => onChangeClickHandler('all')} name='All' />
                <Button onClick={() => onChangeClickHandler('active')} name='Active' />
                <Button onClick={() => onChangeClickHandler('completed')} name='Completed' />
            </div>
        </div>
    )
}

export default TodoList;