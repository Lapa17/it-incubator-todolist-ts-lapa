import React, { useState } from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'
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
    
    const [filter, setFilter] = useState('all')

    // const setTasks = result[1] //функция, которая отслеживает изменеие state
    // const tasks = result[0] //текущее состояние
    
   const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task => task.id !== taskID))
        console.log(tasks);
        
    }
    const changeFilter = (filter: FilterValuesType) =>{
        setFilter(filter);
    }





    let taskForRender: Array<TaskType> = tasks;
    if(filter === 'active'){
        taskForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed'){
        taskForRender = tasks.filter(t => t.isDone === true)
    }
    //UI:
    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={taskForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />  {/* TodoList({title: "What to learn"}) */}
            {/*<TodoList title={"What to buy"}/>*/}
            {/*<TodoList title={"What to read"}/>*/}
        </div>
    );
}

export default App;
