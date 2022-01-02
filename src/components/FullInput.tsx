import React, { useCallback } from "react"
import { useState } from "react"
import { SuperButton } from "./SuperButton"
import { SuperInput } from "./SuperInput"
import AddIcon from '@material-ui/icons/Add';

type FullInputPropsType = {
    addItem: (title: string) => void
    label:string
}

export const FullInput = React.memo((props: FullInputPropsType) => {

    //console.log('Use fullinput');
    
    const [error, setError] = useState<boolean>(false)

    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    const addTaskHandler = useCallback(() => {
        if (newTaskTitle.trim()) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
        else {
            setError(true)
        }
    },[newTaskTitle,props.addItem, setNewTaskTitle,setError ])

    return (<div>

        <SuperInput newTitle={newTaskTitle} callBack={props.addItem} setNewTitle={setNewTaskTitle} addTaskHandler={addTaskHandler} error={error} setError={setError} label={props.label} variant={"outlined"}/>
        <SuperButton onClick={addTaskHandler} color={"primary"} name={<AddIcon/>} />
        <div className={error ? 'error-message' : ''}>{error}</div>
    </div>
    )
})
