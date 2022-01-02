import React, { useState, useReducer, useCallback} from 'react';
import { v1 } from 'uuid';
import './App.css';
import { SuperButton } from './components/SuperButton';
import {FullInput} from './components/FullInput';
import { SuperInput } from './components/SuperInput';
import TodoList from "./TodoList";
import { AppBar, Button, CardContent, Container, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card'
import MenuIcon from '@material-ui/icons/Menu';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reduser';
import { removeTaskAC, tasksReducer,addTaskAC , changeChekedAC, NewTaskTitleChangeAC} from './state/tasks-reduser';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType, store } from './state/store';


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
export const AppWithRedux = React.memo(() => {
    //BLL:
    const tasks = useSelector<AppRootStateType, TaskArrayType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    const dispatch = useDispatch()


    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID,todoListID))
    },[dispatch])


    const changeCheked = useCallback((check: CheckType, taskId: string, todoListID: string) => {
        dispatch(changeChekedAC(check,taskId,todoListID))
    },[dispatch])

    const onNewTaskTitleChange = useCallback((newTitle: string, taskId: string, todoListID: string) => {
        dispatch(NewTaskTitleChangeAC(newTitle,taskId,todoListID))
    }, [dispatch])


    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title,todoListID))
    },[dispatch])

    const addTdodolist = useCallback((title: string) => {
       const action = addTodolistAC(title)
       dispatch(action)
    },[dispatch])


    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))
    },[dispatch])

    const onTodolistTitleChange = useCallback((newTitle: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(newTitle,todoListID))
    },[dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID,value))
    },[dispatch]);

    const todoListComponents = todolists.map(tl => {
        return <Grid item key={tl.id}>
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
})
