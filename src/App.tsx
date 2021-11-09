import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList from "./TodoList";


export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


export type TaskArrayType = {
    [key: string]: Array<TaskType>
}


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
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What we learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    let tasksForState: TaskArrayType = {
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
        ]
    }
    

    const [tasks, setTasks] = useState<TaskArrayType>(tasksForState)


    // const setTasks = result[1] //функция, которая отслеживает изменеие state
    // const tasks = result[0] //текущее состояние

    const removeTask = (taskID: string, todoListID: string) => {
        const copyState = {...tasks}
        copyState[todoListID] = tasks[todoListID].filter(task => task.id !== taskID)
        setTasks(copyState)
    }


    const changeCheked = (check: CheckType, taskId: string, todoListID: string) => {
        // let task = tasks.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = check;
        // }
        // setTasks([...tasks])
        setTasks({...tasks,[todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: check}: t) })
    }


    const addTask = (title: string, todoListID: string) => {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const copyState = {...tasks}
        copyState[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyState)
        // 2 варианта
        let newTasks = {...tasks, [todoListID]: [newTask, ...tasks[todoListID]]}
        setTasks(newTasks)

    }

    const removeTodoList = (todoListID: string) => {
        setTodolists(todoLists.filter(t => t.id !== todoListID))
        delete tasks[todoListID]
    }

    //UI:
    const todoListComponents = todoLists.map(tl => {
        return <TodoList 
        key = {tl.id}
        id = {tl.id}
        title={"What to learn"}
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
        changeCheked={changeCheked}
        todoLists={todoLists}
        setTodolists={setTodolists}
        setTasks={setTasks}

    />
    })


    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}

export default App;