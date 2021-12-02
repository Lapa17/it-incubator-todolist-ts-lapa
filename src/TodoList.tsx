import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { CheckType, FilterValuesType, TaskArrayType, TaskType, TodoListType } from "./App";
import { SuperButton } from './components/SuperButton';
import FullInput from './components/FullInput';
import { SuperInput } from './components/SuperInput';
import SuperSpan from './components/SuperSpan';
import TasksMap from './components/TasksMap';
import { ButtonGroup } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Typography from '@material-ui/core/Typography'

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeCheked: (check: CheckType, taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    onNewTaskTitleChange: (newTitle: string, id: string, todoListID: string,) => void
    onTodolistTitleChange: (newTitle: string, todoListID: string) => void

}

const TodoList = ({ tasks, removeTask, addTask, title, changeCheked, filter, changeFilter, removeTodoList, ...props }: TodoListPropsType) => {

    const onRemoveTodoListHandler = () => {
        removeTodoList(props.todoListID)
    }

    const onAllClickHandler = () => changeFilter('all', props.todoListID)
    const onActiveClickHandler = () => changeFilter('active', props.todoListID)
    const onCompletedClickHandler = () => changeFilter('completed', props.todoListID)
    const onTaskTitleChange = (newTitle: string, id: string) => props.onNewTaskTitleChange(newTitle, id, props.todoListID)
    const onTodolistTitleChangeHandler = (newTitle: string) => props.onTodolistTitleChange(newTitle, props.todoListID)
    const AddTaskHandler = (title: string) => {
        addTask(title, props.todoListID)
    }
    debugger

    let taskForRender = tasks

    if (filter === 'active') {
        taskForRender = tasks.filter(t => t.isDone === false)

    }
    if (filter === 'completed') {
        taskForRender = tasks.filter(t => t.isDone === true)

    }

    return (
        <div className="todolist">
            <Typography variant="h5">
                <SuperSpan title={title} onTitleChange={onTodolistTitleChangeHandler} />
                <SuperButton onClick={onRemoveTodoListHandler} color="primary" name={
                        <HighlightOffIcon/>
                } />
            </Typography>
            <div>
                {/* <FullInput callBack={addTask}/> */}
                <FullInput addItem={AddTaskHandler} label="Enter task.."/>
            </div>
            <TasksMap tasks={taskForRender} todoListID={props.todoListID} removeTask={removeTask} changeTaskStatus={changeCheked} onNewTaskTitleChange={onTaskTitleChange} />

            <div>
                <ButtonGroup variant="contained" >
                <SuperButton color={filter === 'all' ? "secondary" : "primary"} onClick={onAllClickHandler} name='All' />
                <SuperButton color={filter === 'active' ? "secondary" : "primary"} onClick={onActiveClickHandler} name='Active' />
                <SuperButton color={filter === 'completed' ? "secondary" : "primary"} onClick={onCompletedClickHandler} name='Completed' />
                </ButtonGroup>
            </div>
        </div>
    )
}

export default TodoList;


// 