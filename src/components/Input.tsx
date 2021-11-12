import { type } from 'os';
import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, SetStateAction } from 'react';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type InputPropsType = DefaultInputPropsType & {
    id: string
    newTaskTitle?: string 
    error?:string
    callBack: (title:string,  todoListID: string)=> void
    setNewTaskTitle:(title:string)=> void
    addTaskHandler: ()=> void
    setError:React.Dispatch<SetStateAction<string>>
    
}

export const Input = ({id, newTaskTitle, error,setError,callBack,setNewTaskTitle, addTaskHandler, ...props}:InputPropsType)=>{


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter' && newTaskTitle) {
            callBack(newTaskTitle, id)
            addTaskHandler()
        }

    }

    return (
        <input onChange={onNewTitleChangeHandler} type={props.type}
        value={newTaskTitle}
        onKeyPress={onKeyPressHandler} className={ error ? 'error' : ''}/>
    )
}