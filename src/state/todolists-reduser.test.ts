import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReduser
} from './todolists-reduser';
import { v1 } from "uuid"
import {FilterValuesType, TodoListType} from "../App"




test('correct todolist shoud be removed', ()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const startState: Array<TodoListType> = [
        { id: todoListId_1, title: 'What we learn', filter: 'all' },
        { id: todoListId_2, title: 'What to buy', filter: 'all' }
    ]
    const endState = todolistsReduser(startState, removeTodolistAC(todoListId_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId_2)
})


test('correct todolist shoud be added', ()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    let newTodolistTitle = "New todolist"

    const startState: Array<TodoListType> = [
        { id: todoListId_1, title: 'What we learn', filter: 'all' },
        { id: todoListId_2, title: 'What to buy', filter: 'all' }
    ]
    const endState = todolistsReduser(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe('all')
})

test('correct todolist title shoud be changed', ()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    let newTodolistTitle = "New todolist"

    const startState: Array<TodoListType> = [
        { id: todoListId_1, title: 'What we learn', filter: 'all' },
        { id: todoListId_2, title: 'What to buy', filter: 'all' }
    ]
    const action = {
        type: 'CHANGE_TODOLIST_TITLE' as const,
        id: todoListId_2,
        title:newTodolistTitle
    }

    const endState = todolistsReduser(startState, changeTodolistTitleAC(newTodolistTitle,todoListId_2))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe(newTodolistTitle)
    expect(endState[1].filter).toBe('all')
})

test('correct filter of todolist shoud be changed', ()=>{
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    let filter:FilterValuesType = "active"

    const startState: Array<TodoListType> = [
        { id: todoListId_1, title: 'What we learn', filter: 'all' },
        { id: todoListId_2, title: 'What to buy', filter: 'all' }
    ]
    const action = {
        type: 'CHANGE_TODOLIST_FILTER' as const,
        id: todoListId_1,
        filter:filter
    }

    const endState = todolistsReduser(startState, changeTodolistFilterAC(todoListId_1,filter))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What we learn')
    expect(endState[0].filter).toBe(filter)
})

