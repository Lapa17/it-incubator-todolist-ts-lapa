import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

const ADD_STATE = "ADD_STATE"
const REMOVE_STATE = "REMOVE_STATE"
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"

export const removeTodolistAC =(id:string):RemoveStateActionType =>({type: REMOVE_STATE, id}) as const
export const addTodolistAC =(newTodolis: TodoListType):AddStateActionType =>({type: ADD_STATE, newTodolis}) as const
export const changeTodolistTitleAC =(title:string, id:string):ChangeTodolistTitleActionType =>(
    {type: CHANGE_TODOLIST_TITLE, title,id}) as const
export const changeTodolistFilterAC =(id:string,filter:FilterValuesType):ChangeTodolistFilterActionType =>(
    {type: CHANGE_TODOLIST_FILTER, id,filter}) as const

type TodolistActionType = RemoveStateActionType | AddStateActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

type RemoveStateActionType ={
    type: "REMOVE_STATE"
    id: string
}
type AddStateActionType ={
    type: "ADD_STATE"
    newTodolis: TodoListType
}
type ChangeTodolistTitleActionType ={
    type: "CHANGE_TODOLIST_TITLE"
    id:string
    title: string
}
type ChangeTodolistFilterActionType ={
    type: "CHANGE_TODOLIST_FILTER"
    id:string
    filter: FilterValuesType
}

export const todolistsReduser = (state: Array<TodoListType>, action: TodolistActionType): Array<TodoListType> => {
    switch (action.type) {
        case REMOVE_STATE: {
            return state.filter(tl => tl.id !== action.id)
        }
        case ADD_STATE: {
            return (
                [action.newTodolis, ...state ]
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
