import React, { ChangeEvent, KeyboardEvent, SetStateAction } from 'react';

type PropsType ={
    newTaskTitle: string
    callBack: (title:string)=> void
    setNewTaskTitle:(title:string)=> void
    addTaskHandler: ()=> void
    setError:React.Dispatch<SetStateAction<string>>
    error:string
}

export const Input = ({error,setError, ...props}:PropsType)=>{


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            props.callBack(props.newTaskTitle)
            props.addTaskHandler()
        }

    }

    return (
        <input onChange={onNewTitleChangeHandler} 
        value={props.newTaskTitle}
        onKeyPress={onKeyPressHandler} className={ error ? 'error' : ''}/>
    )
}