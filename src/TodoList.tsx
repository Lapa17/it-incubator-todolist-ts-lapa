import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { CheckType, FilterValuesType, TaskType } from "./App";
import { Button } from './components/Button';
import { Input } from './components/Input';
import { TaskMap } from './components/TaskMap';

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
            <TaskMap taskId={task.id} taskTitle={task.title} taskIsDone={task.isDone} onRemoveHandler={onRemoveHandler}/>
        )
    }
    )
    const onChangeClickHandler = (value: FilterValuesType) => {
        changeFilter(value)
    };

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const addTaskHandler = () => {
        if (newTaskTitle) {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                {/* <FullInput callBack={addTask}/> */}
                <Input newTaskTitle={newTaskTitle} callBack={addTask} setNewTaskTitle={setNewTaskTitle} addTaskHandler={addTaskHandler}/>
                <Button onClick={addTaskHandler} name={'+'}/>
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