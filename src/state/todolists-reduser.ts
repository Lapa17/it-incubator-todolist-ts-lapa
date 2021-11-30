import { v1 } from "uuid";
import { TodoListType } from "../App";


type TodolistActionType = {
    type: string
    [key:string]: any
}

export const todolistsReduser = (state:Array<TodoListType>, action:TodolistActionType): Array<TodoListType> => {
    switch(action.type) {
     case "REMOVE_STATE":     {
        return state.filter(tl => tl.id !== action.id)
    }
    case "ADD_STATE":     {
        return (
            [...state, {id:v1(), title: action.title, filter: 'all'}]
        )
    }

    case "CHANGE_TODOLIST_TITLE":     {
        return (
            state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl)
        )
    }
    case "CHANGE_TODOLIST_FILTER":     {
        return (
            state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl)
        )
    }
    default:
        return state
    }
}