import React, { ChangeEvent, KeyboardEvent, SetStateAction } from 'react';

type InputPropsType ={
    id: string
    newTaskTitle: string
    error:string
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
        if (e.key === 'Enter') {
            callBack(newTaskTitle, id)
            addTaskHandler()
        }

    }

    return (
        <input onChange={onNewTitleChangeHandler} 
        value={newTaskTitle}
        onKeyPress={onKeyPressHandler} className={ error ? 'error' : ''}/>
    )
}