import React from "react"
import { useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"

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

        <Input newTitle={newTaskTitle} callBack={props.addItem} setNewTitle={setNewTaskTitle} addTaskHandler={addTaskHandler} error={error} setError={setError} />
        <Button onClick={addTaskHandler} name={'+'} />
        <div className={error ? 'error-message' : ''}>{error}</div>
    </div>
    )
}

export default FullInput;