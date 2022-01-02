import {v1} from "uuid";
import { CheckType, TaskArrayType, TaskType, TodoListType} from "../App";
import { AddStateActionType, ADD_NEW_TODOLIST } from "./todolists-reduser";

const REMOVE_TASK = "REMOVE_TASK"
const ADD_TASK = "ADD_TASK"
const CHANGE_CHACKED = "CHANGE_CHACKED"
const NEW_TASK_TITLE = "NEW_TASK_TITLE"



type TaskActionType = RemoveTaskActionType | 
AddTaskActionType | ChangeCheckedActionType | NewTaskTitleActionType | AddStateActionType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC> 

type AddTaskActionType = ReturnType<typeof addTaskAC> 

type ChangeCheckedActionType = ReturnType<typeof changeChekedAC>

type NewTaskTitleActionType = ReturnType<typeof NewTaskTitleChangeAC>



export const removeTaskAC =(id:string,todolistID:string ) =>({type: REMOVE_TASK, id, todolistID}) as const
export const addTaskAC =(title: string, todolistID: string) =>({type: ADD_TASK, title, todolistID}) as const
export const changeChekedAC = (check: CheckType, taskId: string, todolistID: string) =>({type: CHANGE_CHACKED, check, taskId, todolistID}) as const
export const NewTaskTitleChangeAC = (newTitle: string, taskId: string, todolistID: string) =>({type: NEW_TASK_TITLE, newTitle, taskId, todolistID}) as const

export const tasksReduser = (state: TaskArrayType, action: TaskActionType): TaskArrayType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)}
        }
        case ADD_TASK: {
            return { ...state, [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]}
        }
        case CHANGE_CHACKED: {
            return { ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskId ? { ...t, isDone: action.check } : t) }
        }
        case NEW_TASK_TITLE: {
            return { ...state, [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskId ? { ...t, title: action.newTitle } : t) }
        }
        case ADD_NEW_TODOLIST:{
            return { ...state, [action.todolistId]: [] }
        }
        default:
            return state
    }
}
