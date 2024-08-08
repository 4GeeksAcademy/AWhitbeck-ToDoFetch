import React, { useState } from 'react';

export function TodoContainer() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    const handleCheckboxChange = (index) => {
        const updatedTodos = todos.map((todo, todoIndex) => {
            if (todoIndex === index) {
                return { ...todo, done: !todo.done };
            }
            return todo;
        });

        setTodos(updatedTodos);
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
