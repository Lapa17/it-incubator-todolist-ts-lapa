import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { CheckType, FilterValuesType, TaskArrayType, TaskType, TodoListType } from "./App";
import { Button } from './components/Button';
import { Input } from './components/Input';
import { TaskMap } from './components/TaskMap';

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeCheked:(check:CheckType, taskId:string, todoListID: string)=> void
    todoLists:Array<TodoListType>
    setTodolists:React.Dispatch<React.SetStateAction<TodoListType[]>>
    changeFilter:(value: FilterValuesType, todoListID: string) => void
    removeTodoList:(todoListID: string) => void
    filter: FilterValuesType

}

const TodoList = ({ tasks, removeTask, addTask, title,changeCheked,setTodolists, todoLists,filter,changeFilter,removeTodoList,  ...props}: TodoListPropsType) => {

    const [error,setError] = useState('')
    
    const onRemoveTodoListHandler = () =>{
        removeTodoList(props.id)
    }

    


    const tasksJSXelements = tasks.map(task => {
        const onRemoveHandler = () => removeTask(task.id, props.id)
        const onChangeCheckHandler =(e:ChangeEvent<HTMLInputElement>) => {
            changeCheked(e.currentTarget.checked, task.id, props.id)
        }
        return (
            <TaskMap taskId={task.id} taskTitle={task.title} taskIsDone={task.isDone} onRemoveHandler={onRemoveHandler} onChangeCheckHandler={onChangeCheckHandler}/>
        )
    }
    )
    

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const addTaskHandler = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle, props.id)
            setNewTaskTitle('')
        }
        else {
            setError('Title is empty')
        }
    }
    
    return (
        <div className="todolist">
            <h3>{title}
                <Button onClick={onRemoveTodoListHandler} name={'x'}/>
            </h3>
            <div>
                {/* <FullInput callBack={addTask}/> */}
                <Input newTaskTitle={newTaskTitle} callBack={addTask} setNewTaskTitle={setNewTaskTitle} addTaskHandler={addTaskHandler} error={error} setError={setError} id={props.id}/>
                <Button onClick={addTaskHandler} name={'+'} />
                <div className={error ? 'error-message' : ''}>{error}</div>
            </div>
            <ul>
                {tasksJSXelements}
            </ul>
            <div>
                <Button filter={filter === 'all'? 'all': ''} onClick={() => changeFilter('all', props.id)} name='All' />
                <Button filter={filter === 'active'? 'active': ''} onClick={() => changeFilter('active', props.id)} name='Active' />
                <Button filter={filter === 'completed'? 'completed': ''} onClick={() => changeFilter('completed', props.id)} name='Completed' />
            </div>
        </div>
    )
}

export default TodoList;


// 