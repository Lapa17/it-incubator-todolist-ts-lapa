import React from 'react'

type ButtonPropsType = {
    onClick: ()=> void
    name: string
}


export const Button =({onClick,name, ...props}:ButtonPropsType) =>{
    
    const onBtnClick = () =>{
        onClick()
    } 
    
    return (
        <button onClick={onBtnClick}>{name}</button>
    )
}