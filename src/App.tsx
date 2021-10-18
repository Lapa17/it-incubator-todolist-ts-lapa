import React, { useState } from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
// C-"R"-UD
// CLI -> GUI -> UI
function App() {
    //BLL:
    let tasksForState: Array<TaskType> = [  
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(tasksForState)
    console.log([tasks, setTasks]);
    

    // const setTasks = result[1]
    // const tasks = result[0]
    
    // const addTask = (newTaskValue: object) =>{
    //     tasks.push(newTaskValue)
    // }
    
    

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task => task.id !== taskID))
        console.log(tasks);
        
    }


    //UI:
    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasks}
                removeTask={removeTask}
            />  {/* TodoList({title: "What to learn"}) */}
            {/*<TodoList title={"What to buy"}/>*/}
            {/*<TodoList title={"What to read"}/>*/}
        </div>
    );
}

export default App;
