import "./App.css";
import { useState } from "react";
import { Task } from "./task.js";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <div className="App">
      <h1>TO-DO APP</h1>
      <div className="addTask">
        <input
          onChange={(event) => {
            setNewTask(event.target.value);
          }}
        />
        <button
          onClick={() => {
            const task = {
              id:
                todoList.length === 0
                  ? 1
                  : todoList[todoList.length - 1].id + 1,
              taskName: newTask,
              completed: false,
            };
            setTodoList([...todoList, task]);
          }}
        >
          Add Task
        </button>
      </div>
      <div className="list">
        {todoList.map((task) => {
          return (
            <Task
              taskName={task.taskName}
              id={task.id}
              completed={task.completed}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
