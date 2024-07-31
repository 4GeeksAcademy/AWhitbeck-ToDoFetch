import React, { useState } from 'react';
import { Todo } from './Todo';

export function TodoCounter(){
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    return (
        <div>
            <input
                type="text"
                value={task}
                onCheange={(event) => {
                    setTask(event.target.value);
                }}
                onKeyDown={(event) => {
                    const key = event.key;

                    if (key === 'Enter') {
                        const newTodo = {
                            task,
                            id: todo.length + 1,
                        }

                        setTodos([...todos, newTodo]);
                        setTask("");
                    }
                }}
            />

            {todos.map((todo) => (
                <todo key={todo.id} tod={todo} />
            ))}
        </div>
    )})