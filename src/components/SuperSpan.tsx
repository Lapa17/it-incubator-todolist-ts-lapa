import React, { ChangeEvent, useState } from "react"

export type SuperspanPropsType = {
    title: string
    onTitleChange: (newTitle: string) => void
}


const SuperSpan = (props: SuperspanPropsType) => {

    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState('')

    const onEditActivateHandler = () => {
        setEdit(true)
        setTitle(props.title)
    }
    const onNoViewHandler = () => {
        setEdit(false)
        props.onTitleChange(title)
    }

    let onEditModWrite = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return edit
        ? <input value={title} onBlur={onNoViewHandler} onChange={onEditModWrite} autoFocus />
        : <span onDoubleClick={onEditActivateHandler}>{props.title}</span>


}

export default SuperSpan;