import React from 'react'
import { FilterValuesType } from '../App'

type ButtonPropsType = {
    onClick: ()=> void
    name: string

}


export const Button =({onClick,name, ...props}:ButtonPropsType) =>{
    
    const onBtnClick = () =>{
        onClick()
    } 
    
    return (
        <button onClick={onBtnClick} >{name}</button>
    )
}
//className={filter === 'all' || filter === 'active' || filter === 'completed' ? 'active-filter' : ''}