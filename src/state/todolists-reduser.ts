import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

export const ADD_NEW_TODOLIST = "ADD_NEW_TODOLIST"
export const REMOVE_TODOLIST = "REMOVE_TODOLIST"
export const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
export const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"

export const removeTodolistAC =(id:string):RemoveStateActionType =>({type: REMOVE_TODOLIST, id}) as const
export const addTodolistAC =(title: string):AddStateActionType =>({type: ADD_NEW_TODOLIST, title, todolistId: v1()}) as const
export const changeTodolistTitleAC =(title:string, id:string):ChangeTodolistTitleActionType =>(
    {type: CHANGE_TODOLIST_TITLE, title,id}) as const
export const changeTodolistFilterAC =(id:string,filter:FilterValuesType):ChangeTodolistFilterActionType =>(
    {type: CHANGE_TODOLIST_FILTER, id,filter}) as const

type TodolistActionType = RemoveStateActionType | AddStateActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type RemoveStateActionType ={
    type: "REMOVE_TODOLIST"
    id: string
}
export type AddStateActionType ={
    type: "ADD_NEW_TODOLIST"
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType ={
    type: "CHANGE_TODOLIST_TITLE"
    id:string
    title: string
}
export type ChangeTodolistFilterActionType ={
    type: "CHANGE_TODOLIST_FILTER"
    id:string
    filter: FilterValuesType
}


const initialState: Array<TodoListType> = []

export const todolistsReducer = (state = initialState, action: TodolistActionType): Array<TodoListType> => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.id)
        }
        case ADD_NEW_TODOLIST: {
            return (
                [{id: action.todolistId, title: action.title, filter:'all'}, ...state ]
            )
        }

        case CHANGE_TODOLIST_TITLE: {
            return (
                state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
            )
        }
        case CHANGE_TODOLIST_FILTER: {
            return (
                state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
            )
        }
        default:
            return state
    }
}
