import React from "react"
import { useState } from "react"
import { SuperButton } from "./SuperButton"
import { SuperInput } from "./SuperInput"

type FullInputPropsType = {
    addItem: (title: string) => void
}

const FullInput = (props: FullInputPropsType) => {
    const [error, setError] = useState('')

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const addTaskHandler = () => {
        if (newTaskTitle.trim()) {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        }
        else {
            setError('Title is empty')
        }
    }

    return (<div>

        <SuperInput newTitle={newTaskTitle} callBack={props.addItem} setNewTitle={setNewTaskTitle} addTaskHandler={addTaskHandler} error={error} setError={setError} />
        <SuperButton onClick={addTaskHandler} name={'+'} />
        <div className={error ? 'error-message' : ''}>{error}</div>
    </div>
    )
}

export default FullInput;