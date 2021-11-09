import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { CheckType, FilterValuesType, TaskArrayType, TaskType, TodoListType } from "./App";
import { Button } from './components/Button';
import { Input } from './components/Input';
import { TaskMap } from './components/TaskMap';

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskArrayType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeCheked:(check:CheckType, taskId:string, todoListID: string)=> void
    todoLists:Array<TodoListType>
    setTodolists:React.Dispatch<React.SetStateAction<TodoListType[]>>
    setTasks: React.Dispatch<React.SetStateAction<TaskArrayType>>

}

const TodoList = ({ tasks, removeTask, addTask, title,changeCheked,setTodolists, todoLists,setTasks,  ...props}: TodoListPropsType) => {

    const [error,setError] = useState('')
    


    let taskForRender = tasks;

    


    const tasksJSXelements = taskForRender[props.id].map(task => {
        const onRemoveHandler = () => removeTask(task.id, props.id)
        const onChangeCheckHandler =(e:ChangeEvent<HTMLInputElement>) => {
            changeCheked(e.currentTarget.checked, task.id, props.id)
        }
        

        return (
            <TaskMap taskId={task.id} taskTitle={task.title} taskIsDone={task.isDone} onRemoveHandler={onRemoveHandler} onChangeCheckHandler={onChangeCheckHandler}/>
        )
    }
    )
    const onChangeClickHandler = (value: FilterValuesType, todoListID: string) => {
        let todolist = todoLists.find(tl => tl.id === todoListID)
        if(todolist){
            todolist.filter = value;
            setTodolists([...todoLists])
        }
        if( value === 'all'){
            taskForRender[props.id] =tasks[props.id].filter(t => t)
            setTasks({...tasks})
        }
        if( value === 'active'){
            taskForRender[props.id] = tasks[props.id].filter(t => t.isDone === false)
            setTasks({...tasks})
        }
        if (value === 'completed'){
            taskForRender[props.id] = tasks[props.id].filter(t => t.isDone === true)
            setTasks({...tasks})
        }
        
    };

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
            <h3>{title}</h3>
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
                <Button onClick={() => onChangeClickHandler('all', props.id)} name='All' />
                <Button onClick={() => onChangeClickHandler('active', props.id)} name='Active' />
                <Button onClick={() => onChangeClickHandler('completed', props.id)} name='Completed' />
            </div>
        </div>
    )
}

export default TodoList;


// filter={todoLists[0].filter === 'all'? 'all': ''}