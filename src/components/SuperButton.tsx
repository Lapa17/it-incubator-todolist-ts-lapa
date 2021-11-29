import { Button } from '@material-ui/core'
import React from 'react'
import { FilterValuesType } from '../App'

type ButtonPropsType = {
    onClick: () => void
    name: string | JSX.Element
    filter?: string
    color:"secondary" | "primary" | "inherit" | "default" | undefined

}


export const SuperButton = ({ onClick, name, filter, ...props }: ButtonPropsType) => {



    const onBtnClickHandler = () => onClick()

    const filteredClassName = filter === 'all' || filter === 'active' || filter === 'completed' ? "secondary" : "primary"

    return (
        // <button onClick={onBtnClickHandler} className={filteredClassName}>{name}</button>
        <Button onClick={onBtnClickHandler} color={props.color ? props.color : "primary"} >{name}</Button>
    )
}
//