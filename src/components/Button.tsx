import React from 'react'
import { FilterValuesType } from '../App'

type ButtonPropsType = {
    onClick: ()=> void
    name: string
    filter?:string

}


export const Button =({onClick,name,filter, ...props}:ButtonPropsType) =>{

    
    
    const onBtnClickHandler = () => onClick() 
    
    const filteredClassName = filter === 'all' || filter === 'active' || filter === 'completed' ? 'active-filter' : ''

    return (
        <button onClick={onBtnClickHandler} className={filteredClassName}>{name}</button>
    )
}
//