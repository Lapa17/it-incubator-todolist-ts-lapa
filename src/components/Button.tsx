import React from 'react'
import { FilterValuesType } from '../App'

type ButtonPropsType = {
    onClick: ()=> void
    name: string
    filter: string | null
}


export const Button =({onClick,name,filter, ...props}:ButtonPropsType) =>{
    
    const onBtnClick = () =>{
        onClick()
    } 
    
    return (
        <button onClick={onBtnClick} className={filter === 'all' || filter === 'active' || filter === 'completed' ? 'active-filter' : ''}>{name}</button>
    )
}