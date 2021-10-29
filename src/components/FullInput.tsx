import React, { ChangeEvent, useState, KeyboardEvent, ChangeEventHandler } from 'react';
import { Button } from './Button';
import { Input } from './Input';

    type PropsType ={
        callBack: (title:string)=> void
    }

    

export const FullInput = (props:PropsType)=>{
    
    const [newTaskTitle, setNewTaskTitle] = useState('')

    
    const addTaskHandler = () => {
        if (newTaskTitle) {
            props.callBack(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    return (<div>
        <Input newTaskTitle={newTaskTitle} callBack={props.callBack} setNewTaskTitle={setNewTaskTitle} addTaskHandler={addTaskHandler}/>
        <Button onClick={addTaskHandler} name='+' />
        </div>
    )
}