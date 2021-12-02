import React, { useState, useReducer} from 'react';
import { v1 } from 'uuid';
import './App.css';
import { SuperButton } from './components/SuperButton';
import FullInput from './components/FullInput';
import { SuperInput } from './components/SuperInput';
import TodoList from "./TodoList";
import { AppBar, Button, CardContent, Container, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card'
import MenuIcon from '@material-ui/icons/Menu';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReduser } from './state/todolists-reduser';
import { removeTaskAC, tasksReduser,addTaskAC , changeChekedAC, NewTaskTitleChangeAC, addNewTodolistAC} from './state/tasks-reduser';


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

    const [todoLists, dispatchTodolists] = useReducer(todolistsReduser,[
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


    const [tasks, dispatchTasks] = useReducer(tasksReduser, tasksForState)


    // const setTasks = result[1] //функция, которая отслеживает изменеие state
    // const tasks = result[0] //текущее состояние

    const removeTask = (taskID: string, todoListID: string) => {
        // const copyState = {...tasks}
        // copyState[todoListID] = tasks[todoListID].filter(task => task.id !== taskID)
        // setTasks(copyState)
        dispatchTasks(removeTaskAC(taskID,todoListID))
    }


    const changeCheked = (check: CheckType, taskId: string, todoListID: string) => {
        // let task = tasks.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = check;
        // }
        // setTasks([...tasks])
        // setTasks({ ...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId ? { ...t, isDone: check } : t) })
        dispatchTasks(changeChekedAC(check,taskId,todoListID))
    }

    const onNewTaskTitleChange = (newTitle: string, taskId: string, todoListID: string) => {
        // setTasks({ ...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId ? { ...t, title: newTitle } : t) })
        dispatchTasks(NewTaskTitleChangeAC(newTitle,taskId,todoListID))
    }


    const addTask = (title: string, todoListID: string) => {
        // let newTask: TaskType = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // const copyState = {...tasks}
        // copyState[todoListID] = [newTask, ...tasks[todoListID]]
        // setTasks(copyState)
        // 2 варианта
        // setTasks({ ...tasks, [todoListID]: [newTask, ...tasks[todoListID]] })
        dispatchTasks(addTaskAC(title,todoListID))


    }

    const addTdodolist = (title: string) => {
        let newTodolist: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        dispatchTodolists(addTodolistAC(newTodolist))
        // setTasks({ ...tasks, [newTodolist.id]: [] })
        dispatchTasks(addNewTodolistAC(newTodolist.id))


    }


    const removeTodoList = (todoListID: string) => {
        dispatchTodolists(removeTodolistAC(todoListID))
        delete tasks[todoListID]
    }
    const onTodolistTitleChange = (newTitle: string, todoListID: string) => {
        // let todolist = todoLists.find(tl => tl.id === todoListID)
        //     if(todolist) {
        //         todolist.title = newTitle
        //         setTodolists([...todoLists])
        //     }
        dispatchTodolists(changeTodolistTitleAC(newTitle,todoListID))
    }
    const changeFilter = (value: FilterValuesType, todoListID: string) => {
        // let todolist = todoLists.find(tl => tl.id === todoListID)
        // if(todolist){
        //     todolist.filter = value;
        //     setTodolists([...todoLists])
        // }
        dispatchTodolists(changeTodolistFilterAC(todoListID,value))


    };
    //UI:
    const todoListComponents = todoLists.map(tl => {




        return <Grid item >
            <Card>
                <CardContent>
                    <TodoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
                        filter={tl.filter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeCheked={changeCheked}
                        onNewTaskTitleChange={onNewTaskTitleChange}
                        changeFilter={changeFilter}
                        removeTodoList={removeTodoList}
                        onTodolistTitleChange={onTodolistTitleChange}


                    />
                </CardContent>
            </Card>
        </Grid>
    })


    return (<div>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start"  color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <Container maxWidth="xl">
            <Grid container className="App" spacing={5} style={{marginTop:"10px"}}>
                <Grid item >
                    <Card>
                        <CardContent>
                            <FullInput addItem={addTdodolist} label="Enter to-do-list" />
                        </CardContent>
                    </Card>
                </Grid>
                {todoListComponents}
            </Grid>
        </Container>
    </div>);
}

export default App;