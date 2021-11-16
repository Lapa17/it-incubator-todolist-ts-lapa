import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Button } from './components/Button';
import FullInput from './components/FullInput';
import { Input } from './components/Input';
import TodoList from "./TodoList";


export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


export type TaskArrayType = {
    [key: string]: Array<TaskType>
}


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type CheckType = true | false


// C-"R"-UD
// CLI -> GUI -> UI
function App() {
    //BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodolists] = useState<Array<TodoListType>>([
        { id: todoListId_1, title: 'What we learn', filter: 'all' },
        { id: todoListId_2, title: 'What to buy', filter: 'all' }
    ])

    let tasksForState: TaskArrayType = {
        [todoListId_1]: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Redux", isDone: false },
        ],
        [todoListId_2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Meat", isDone: true },
            { id: v1(), title: "Beer", isDone: false },
            { id: v1(), title: "Bread", isDone: false },
        ]
    }


    const [tasks, setTasks] = useState<TaskArrayType>(tasksForState)


    // const setTasks = result[1] //функция, которая отслеживает изменеие state
    // const tasks = result[0] //текущее состояние

    const removeTask = (taskID: string, todoListID: string) => {
        // const copyState = {...tasks}
        // copyState[todoListID] = tasks[todoListID].filter(task => task.id !== taskID)
        // setTasks(copyState)
        setTasks({ ...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID) })
    }


    const changeCheked = (check: CheckType, taskId: string, todoListID: string) => {
        // let task = tasks.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = check;
        // }
        // setTasks([...tasks])
        setTasks({ ...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId ? { ...t, isDone: check } : t) })
    }

    const onNewTaskTitleChange = (newTitle: string, taskId: string, todoListID: string) => {
        debugger
        setTasks({ ...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId ? { ...t, title: newTitle } : t) })
    }


    const addTask = (title: string, todoListID: string) => {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const copyState = {...tasks}
        // copyState[todoListID] = [newTask, ...tasks[todoListID]]
        // setTasks(copyState)
        // 2 варианта
        setTasks({ ...tasks, [todoListID]: [newTask, ...tasks[todoListID]] })


    }

    const addTdodolist = (title: string) => {
        let newTodolist: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todoLists])
        setTasks({ ...tasks, [newTodolist.id]: [] })



    }


    const removeTodoList = (todoListID: string) => {
        setTodolists(todoLists.filter(t => t.id !== todoListID))
        delete tasks[todoListID]
    }
    const onTodolistTitleChange = (newTitle: string, todoListID: string) => {
        // let todolist = todoLists.find(tl => tl.id === todoListID)
        //     if(todolist) {
        //         todolist.title = newTitle
        //         setTodolists([...todoLists])
        //     }
        setTodolists(todoLists.map(tl => tl.id === todoListID ? { ...tl, title: newTitle } : tl))
    }
    const changeFilter = (value: FilterValuesType, todoListID: string) => {
        // let todolist = todoLists.find(tl => tl.id === todoListID)
        // if(todolist){
        //     todolist.filter = value;
        //     setTodolists([...todoLists])
        // }
        setTodolists(todoLists.map(tl => tl.id === todoListID ? { ...tl, filter: value } : tl))


    };
    //UI:
    const todoListComponents = todoLists.map(tl => {




        return <TodoList
            key={tl.id}
            todoListID={tl.id}
            title={tl.title}
            tasks={tasks[tl.id]}
            filter={tl.filter}
            removeTask={removeTask}
            addTask={addTask}
            changeCheked={changeCheked}
            onNewTaskTitleChange={onNewTaskTitleChange}
            setTodolists={setTodolists}
            changeFilter={changeFilter}
            removeTodoList={removeTodoList}
            onTodolistTitleChange={onTodolistTitleChange}


        />
    })


    return (
        <div className="App">
            <FullInput addItem={addTdodolist} />
            {todoListComponents}
        </div>
    );
}

export default App;