import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { CheckType, FilterValuesType, TaskArrayType, TaskType, TodoListType } from "./App";
import { Button } from './components/Button';
import { Input } from './components/Input';
import TasksMap from './components/TasksMap';

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeCheked: (check: CheckType, taskId: string, todoListID: string) => void
    setTodolists: React.Dispatch<React.SetStateAction<TodoListType[]>>
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void

}

const TodoList = ({ tasks, removeTask, addTask, title, changeCheked, setTodolists, filter, changeFilter, removeTodoList, ...props }: TodoListPropsType) => {

    const [error, setError] = useState('')

    const onRemoveTodoListHandler = () => {
        removeTodoList(props.todoListID)
    }
    
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const addTaskHandler = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle, props.todoListID)
            setNewTaskTitle('')
        }
        else {
            setError('Title is empty')
        }
    }

    const onAllClickHandler = () => changeFilter('all', props.todoListID)
    const onActiveClickHandler = () => changeFilter('active', props.todoListID)
    const onCompletedClickHandler= () => changeFilter('completed', props.todoListID)

    return (
        <div className="todolist">
            <h3>{title}
                <Button onClick={onRemoveTodoListHandler} name={'x'} />
            </h3>
            <div>
                {/* <FullInput callBack={addTask}/> */}
                <Input newTaskTitle={newTaskTitle} callBack={addTask} setNewTaskTitle={setNewTaskTitle} addTaskHandler={addTaskHandler} error={error} setError={setError} id={props.todoListID} />
                <Button onClick={addTaskHandler} name={'+'} />
                <div className={error ? 'error-message' : ''}>{error}</div>
            </div>
            <ul>
                <TasksMap tasks={tasks} todoListID={props.todoListID} removeTask={removeTask} changeTaskStatus={changeCheked}/>
            </ul>
            <div>
                <Button filter={filter === 'all' ? 'all' : ''} onClick={onAllClickHandler} name='All' />
                <Button filter={filter === 'active' ? 'active' : ''} onClick={onActiveClickHandler} name='Active' />
                <Button filter={filter === 'completed' ? 'completed' : ''} onClick={onCompletedClickHandler} name='Completed' />
            </div>
        </div>
    )
}

export default TodoList;


// 