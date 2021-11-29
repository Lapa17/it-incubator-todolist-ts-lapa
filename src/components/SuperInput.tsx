import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, SetStateAction } from 'react';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type InputPropsType = DefaultInputPropsType & {
    newTitle: string
    error?: string
    callBack: (title: string) => void
    setNewTitle: (title: string) => void
    addTaskHandler: () => void
    setError: React.Dispatch<SetStateAction<string>>

}

export const SuperInput = ({ newTitle, error, setError, callBack, setNewTitle, addTaskHandler, ...props }: InputPropsType) => {


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter' && newTitle) {
            callBack(newTitle)
            addTaskHandler()
        }

    }

    return (
        <input onChange={onNewTitleChangeHandler} type={props.type}
            value={newTitle}
            onKeyPress={onKeyPressHandler} className={error ? 'error' : ''} />
    )
}