import React from 'react';
import { Button } from './Button';

type PropsType = {
    taskId:string
    taskTitle: string
    taskIsDone: boolean
    onRemoveHandler: ()=> void
}


export const TaskMap = ({taskId,taskTitle,taskIsDone,onRemoveHandler, ...props }:PropsType) =>{
        return (
            <li key={taskId}>
                <input type="checkbox" checked={taskIsDone} /> <span>{taskTitle}</span>
                <Button onClick={onRemoveHandler} name='x' />
            </li>
        )
    }
