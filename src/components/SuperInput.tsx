import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, SetStateAction } from 'react';
import TextField from '@material-ui/core/TextField'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type InputPropsType = DefaultInputPropsType & {
    newTitle: string
    error?: boolean
    label?:string
    variant: "outlined" | "standard" | "filled" | undefined 
    callBack: (title: string) => void
    setNewTitle: (title: string) => void
    addTaskHandler: () => void
    setError: React.Dispatch<SetStateAction<boolean>>

}

export const SuperInput = ({ newTitle, error, setError, callBack, setNewTitle, addTaskHandler, ...props }: InputPropsType) => {


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter' && newTitle) {
            callBack(newTitle)
            addTaskHandler()
        }

    }

    return (
        // <input onChange={onNewTitleChangeHandler} type={props.type}
        //     value={newTitle}
        //     onKeyPress={onKeyPressHandler} className={error ? 'error' : ''} />
            <TextField onChange={onNewTitleChangeHandler} 
            onKeyPress={onKeyPressHandler} 
            value={newTitle} 
            label={props.label}
            error={error ? error: undefined}
            helperText={error ? "Title is empty" : ""}     />
            
    )
}