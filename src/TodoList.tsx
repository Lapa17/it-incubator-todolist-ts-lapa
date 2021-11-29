import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { CheckType, FilterValuesType, TaskArrayType, TaskType, TodoListType } from "./App";
import { SuperButton } from './components/SuperButton';
import FullInput from './components/FullInput';
import { SuperInput } from './components/SuperInput';
import SuperSpan from './components/SuperSpan';
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
    onNewTaskTitleChange: (newTitle: string, id: string, todoListID: string,) => void
    onTodolistTitleChange: (newTitle: string, todoListID: string) => void

}

const TodoList = ({ tasks, removeTask, addTask, title, changeCheked, setTodolists, filter, changeFilter, removeTodoList, ...props }: TodoListPropsType) => {

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


    let taskForRender = tasks

    if (filter === 'active') {
        taskForRender = tasks.filter(t => t.isDone === false)

    }
    if (filter === 'completed') {
        taskForRender = tasks.filter(t => t.isDone === true)

    }

    return (
        <div className="todolist">
            <h3>
                <SuperSpan title={title} onTitleChange={onTodolistTitleChangeHandler} />
                <SuperButton onClick={onRemoveTodoListHandler} name={'x'} />
            </h3>
            <div>
                {/* <FullInput callBack={addTask}/> */}
                <FullInput addItem={AddTaskHandler} />
            </div>
            <TasksMap tasks={taskForRender} todoListID={props.todoListID} removeTask={removeTask} changeTaskStatus={changeCheked} onNewTaskTitleChange={onTaskTitleChange} />

            <div>
                <SuperButton filter={filter === 'all' ? 'all' : ''} onClick={onAllClickHandler} name='All' />
                <SuperButton filter={filter === 'active' ? 'active' : ''} onClick={onActiveClickHandler} name='Active' />
                <SuperButton filter={filter === 'completed' ? 'completed' : ''} onClick={onCompletedClickHandler} name='Completed' />
            </div>
        </div>
    )
}

export default TodoList;


// 