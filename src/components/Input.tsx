import React, { ChangeEvent, KeyboardEvent } from 'react';

type PropsType ={
    newTaskTitle: string
    callBack: (title:string)=> void
    setNewTaskTitle:(title:string)=> void
    addTaskHandler: ()=> void
}

export const Input = (props:PropsType)=>{


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.callBack(props.newTaskTitle)
            props.addTaskHandler()
        }

    }

    return (
        <input onChange={onNewTitleChangeHandler} 
        value={props.newTaskTitle}
        onKeyPress={onKeyPressHandler}/>
    )
}