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
import { removeTaskAC, tasksReduser,addTaskAC , changeChekedAC, NewTaskTitleChangeAC} from './state/tasks-reduser';


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


    const removeTask = (taskID: string, todoListID: string) => {
        dispatchTasks(removeTaskAC(taskID,todoListID))
    }


    const changeCheked = (check: CheckType, taskId: string, todoListID: string) => {
        dispatchTasks(changeChekedAC(check,taskId,todoListID))
    }

    const onNewTaskTitleChange = (newTitle: string, taskId: string, todoListID: string) => {
        dispatchTasks(NewTaskTitleChangeAC(newTitle,taskId,todoListID))
    }


    const addTask = (title: string, todoListID: string) => {
        dispatchTasks(addTaskAC(title,todoListID))


    }

    const addTdodolist = (title: string) => {
       const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)


    }


    const removeTodoList = (todoListID: string) => {
        dispatchTodolists(removeTodolistAC(todoListID))
        delete tasks[todoListID]
    }
    const onTodolistTitleChange = (newTitle: string, todoListID: string) => {
        dispatchTodolists(changeTodolistTitleAC(newTitle,todoListID))
    }
    const changeFilter = (value: FilterValuesType, todoListID: string) => {
        dispatchTodolists(changeTodolistFilterAC(todoListID,value))


    };
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