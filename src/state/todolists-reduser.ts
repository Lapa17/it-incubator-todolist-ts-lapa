import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

export const ADD_NEW_TODOLIST = "ADD_NEW_TODOLIST"
const REMOVE_STATE = "REMOVE_STATE"
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"

export const removeTodolistAC =(id:string):RemoveStateActionType =>({type: REMOVE_STATE, id}) as const
export const addTodolistAC =(title: string):AddStateActionType =>({type: ADD_NEW_TODOLIST, title, todolistId: v1()}) as const
export const changeTodolistTitleAC =(title:string, id:string):ChangeTodolistTitleActionType =>(
    {type: CHANGE_TODOLIST_TITLE, title,id}) as const
export const changeTodolistFilterAC =(id:string,filter:FilterValuesType):ChangeTodolistFilterActionType =>(
    {type: CHANGE_TODOLIST_FILTER, id,filter}) as const

type TodolistActionType = RemoveStateActionType | AddStateActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type RemoveStateActionType ={
    type: "REMOVE_STATE"
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

export const todolistsReduser = (state: Array<TodoListType>, action: TodolistActionType): Array<TodoListType> => {
    switch (action.type) {
        case REMOVE_STATE: {
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
