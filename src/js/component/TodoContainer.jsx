import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export function TodoContainer() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [editMode, setEditMode] = useState(null);
    const [editInput, setEditInput] = useState("");

    useEffect(() => {
        async function createUser() {
            let response = await fetch("https://playground.4geeks.com/todo/users/Antonio", {
                headers: { "Content-type": "application/json" },
                method: "POST",
            });
            await response.json();
            getTodo();
        }
        createUser();
    }, []);

    async function getTodo() {
        let response = await fetch("https://playground.4geeks.com/todo/users/Antonio");
        let data = await response.json();
        setTodos(data.todos);
    }

    const addTodo = async () => {
        const newTodo = { label: task, done: false };
        setTodos([...todos, newTodo]);
        setTask("");
        const response = await fetch("https://playground.4geeks.com/todo/todos/Antonio", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newTodo),
        });
        if (response.ok) {
            getTodo();
        } else {
            console.error("FAILED TO ADD TODO");
        }
    };

    const deleteTodo = async (todoID) => {
        let options = {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
        };
        let response = await fetch(`https://playground.4geeks.com/todo/todos/${todoID}`, options);
        if (response.ok) {
            setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== todoID));
        }
    };

    const editTodo = async (todoID, newLabel) => {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoID}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ label: newLabel, is_done: false }),
        });
        if (response.ok) {
            setTodos((previousTodos) =>
                previousTodos.map((todo) =>
                    todo.id === todoID ? { ...todo, label: newLabel } : todo
                )
            );
        } else {
            console.error("FAILED TO EDIT TODO");
        }

        setEditMode(null);
    };

    const toggleTodoDone = async (todoID) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === todoID ? { ...todo, done: !todo.done } : todo
        );
        setTodos(updatedTodos);

        const todo = updatedTodos.find((todo) => todo.id === todoID);
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoID}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ label: todo.label, is_done: todo.done }),
        });

        if (!response.ok) {
            console.error("FAILED TO UPDATE TODO STATUS");
        }
    };

    return (
        <div className="postIt">
            <input
                type="text"
                placeholder="Things to do..."
                value={task}
                onChange={(event) => {
                    setTask(event.target.value);
                }}
                onKeyDown={async (event) => {
                    if (event.key === 'Enter') {
                        await addTodo();
                    }
                }}
            />

            <ul>
                {todos.map((todo, index) => (
                    <div key={index + 1} className="d-flex col-12">
                        {editMode === todo.id ? (
                            <input
                                type="text"
                                value={editInput}
                                autoFocus
                                onChange={(e) => setEditInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        editTodo(todo.id, editInput);
                                    }
                                }}
                                onBlur={() => editTodo(todo.id, editInput)}
                            />
                        ) : (
                            <div
                                className={`d-flex justify-content-between align-items-center w-100 bg-black-subtle ${todo.done ? "strikeThrough" : ""}`}
                                onClick={() => toggleTodoDone(todo.id)}
                            >
                                <li>{todo.label}</li>
                                <div className='button-container'>
                                    <button type="button" onClick={() => {
                                        setEditMode(todo.id);
                                        setEditInput(todo.label);
                                    }}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                    <button
                                        className="bg-black-subtle trash"
                                        type="button"
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
}
