import React, {ChangeEvent} from 'react';
import { Button } from './Button';


type PropsType = {
    taskId:string
    taskTitle: string
    taskIsDone: boolean
    onRemoveHandler: ()=> void
    onChangeCheckHandler: (e:ChangeEvent<HTMLInputElement>)=> void
}


export const TaskMap = ({taskId,taskTitle,taskIsDone,onRemoveHandler,onChangeCheckHandler, ...props }:PropsType) =>{
        return (
            <li key={taskId} className={taskIsDone === true ? 'completed': ''}>
                <input type="checkbox" checked={taskIsDone} onChange={onChangeCheckHandler}/> <span>{taskTitle}</span>
                <Button onClick={onRemoveHandler} name='x' filter={null}/>
            </li>
        )
    }
