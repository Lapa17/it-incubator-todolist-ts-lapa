import {v1} from "uuid";
import { CheckType, TaskArrayType, TaskType, TodoListType} from "../App";

const REMOVE_TASK = "REMOVE_TASK"
const ADD_TASK = "ADD_TASK"
const CHANGE_CHACKED = "CHANGE_CHACKED"
const NEW_TASK_TITLE = "NEW_TASK_TITLE"
const ADD_NEW_TODOLIST = "ADD_NEW_TODOLIST"



type TaskActionType = RemoveTaskActionType | 
AddTaskActionType | ChangeCheckedActionType | NewTaskTitleActionType | AddNewTodolisActionType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC> 

type AddTaskActionType = ReturnType<typeof addTaskAC> 

type ChangeCheckedActionType = ReturnType<typeof changeChekedAC>

type NewTaskTitleActionType = ReturnType<typeof NewTaskTitleChangeAC>

type AddNewTodolisActionType = ReturnType<typeof addNewTodolistAC>


export const removeTaskAC =(id:string,todolistID:string ) =>({type: REMOVE_TASK, id, todolistID}) as const
export const addTaskAC =(title: string, todolistID: string) =>({type: ADD_TASK, title, todolistID}) as const
export const changeChekedAC = (check: CheckType, taskId: string, todolistID: string) =>({type: CHANGE_CHACKED, check, taskId, todolistID}) as const
export const NewTaskTitleChangeAC = (newTitle: string, taskId: string, todolistID: string) =>({type: NEW_TASK_TITLE, newTitle, taskId, todolistID}) as const
export const addNewTodolistAC =(newTodolistID: string) =>({type:ADD_NEW_TODOLIST, newTodolistID}) as const

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
            return { ...state, [action.newTodolistID]: [] }
        }
        default:
            return state
    }
}
