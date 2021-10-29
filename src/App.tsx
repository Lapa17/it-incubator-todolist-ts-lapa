import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type CheckType = true | false


// C-"R"-UD
// CLI -> GUI -> UI
function App() {
    //BLL:
    let tasksForState: Array<TaskType> = [  
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ]    
   

    const [tasks, setTasks] = useState<Array<TaskType>>(tasksForState)
    console.log([tasks, setTasks]);
    // const setTasks = result[1] //функция, которая отслеживает изменеие state
    // const tasks = result[0] //текущее состояние
    
   const removeTask = (taskID: string) => {
       
        setTasks(tasks.filter(task => task.id !== taskID))
        console.log(tasks);
        
    }
    let checkTaskisDone = false
    const changeCheck = (taskID: string) => {
        debugger
        setTasks(tasks.map(task => {
            checkTaskisDone = task.isDone
            if(task.id === taskID){
                if (task.isDone === true){
                    return  checkTaskisDone = false;
                }
                else {
                    return checkTaskisDone = true
                }
            }
            else{
                return task
            }))
        console.log(tasks);
        
    }


    


    const addTask = (title:string) =>{
        let newTask = {
             id: v1(),
             title: title,
             isDone:false
         }
         let newTasks = [newTask, ...tasks]
         setTasks(newTasks)
         
     }
 
    //UI:
    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                changeCheck={changeCheck}
               
            />  
        </div>
    );
}


export default App;
