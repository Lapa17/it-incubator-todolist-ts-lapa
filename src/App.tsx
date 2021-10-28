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

    const [check, setCheck] = useState<CheckType>(true)
    


    // const setTasks = result[1] //функция, которая отслеживает изменеие state
    // const tasks = result[0] //текущее состояние
    
   const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
        console.log(tasks);
        
    }

    let checkTaskForRender: Array<TaskType> = tasks;

    const changeCheked = (check:CheckType) =>{
        setCheck(check)
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
                changeCheked={changeCheked}
            />  
        </div>
    );
}

export default App;
