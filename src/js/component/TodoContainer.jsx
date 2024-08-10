import React, { useState, useEffect } from 'react';

export function TodoContainer() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        async function createUser() {
            let response = await fetch("https://playground.4geeks.com/todo/users/Antonio", {
                headers: { "Content-type": "application/json" },
                method: "POST",
            })
            let data = await response.json()
            getTodo()
        }
        createUser()
    }, [])

        async function getTodo() {
            let response = await fetch("https://playground.4geeks.com/todo/users/Antonio")
            let data = await response.json()
            setTodos(data.todos)
        }

    const handleCheckboxChange = async(index) => {
        const updatedTodos = todos.map((todo, todoIndex) => {
            if (todoIndex === index) {
                return { ...todo, done: !todo.done };
            }
            if(todo.done == true) {
                let response = await("https://playground.4geeks.com/todo/todos/" + todo.id, {
                    body: JSON.stringify({label: todo.label, is_done: todo.done}),
                    headers: { "Content-type": "application/json" },
                    method: "POST",
                })
                let data = response.json()

            }
            else if(todo.done == false) {
                let response = await("https://playground.4geeks.com/todo/todos/Antonio", {
                    body: JSON.stringify({label: todo.label, is_done: todo.done}),
                    headers: { "Content-type": "application/json" },
                    method: "POST",
                })
                let data = response.json()
            }
            return todo;
        });
        getTodo()
    };

    return (
        <div className="postIt">
            <input
                type="text"
                placeholder='Things todo...'
                value={task}
                onChange={(event) => {
                    setTask(event.target.value);
                }}
                onKeyDown={(event) => {
                    const key = event.key;

                    if (key === 'Enter') {
                        const newTodo = {
                            label: task,
                            done: false
                        };

                        setTodos([...todos, newTodo]);
                        setTask("");
                    }
                }}
            />

            <ul>
                {todos.map((todo, index) => (
                    <div key={index + 1} className={todo.done ? "strikeThrough d-flex checkbox" : "d-flex"}>
                        <li>{todo.label}</li>
                        <input
                            type="checkbox" 
                            className="float-right"
                            checked={todo.done}
                            id="#checkbox"
                            onChange={() => handleCheckboxChange(index)}
                        />
                    </div>
                ))}
            </ul>
        </div>
    );
}
