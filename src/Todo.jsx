import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Todo() {
    const [tasks, setTasks] = useState(null);
    const [newTask, setNewTask] = useState('');

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRhbGhhIiwiaWF0IjoxNzQ3NjUzNzgzLCJleHAiOjE3NDg1MTc3ODN9.n_HaF1QjsxHI3kt4vR4q2LN2qpZ2Qh_8SwQiZIUsV6o";

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const addTask = async () => {
        if (!newTask.trim()) return;

        try {
            const response = await axios.post(
                'http://localhost:5000/api/tasks',
                { title: newTask },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTasks([...tasks, response.data]);
            setNewTask('');
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

const removeTask = async (id) => {
  try {
    await axios.post(
      'http://localhost:5000/api/tasks/delete',
      { id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setTasks(tasks.filter(task => task._id !== id));
  } catch (error) {
    console.error('Failed to remove task:', error);
  }
};

    useEffect(() => {
        fetchTasks();
    }, []);
    
    if (tasks === null) return <p className="todo-loading">Loading...</p>;

    return (
        <div className="todo-container">
            <h2 className="todo-title">My To-Do List</h2>

            <div className="todo-input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    placeholder="Enter new task"
                    className="todo-input"
                />
                <button onClick={addTask} className="todo-add-button">Add</button>
            </div>

            {tasks.length === 0 ? (
                <p className="todo-empty">No tasks found.</p>
            ) : (
                <ul className="todo-list">
                    {tasks.map(task => (
                        <li key={task._id} className="todo-item">
                            <span>{task.title}</span>
                            <button onClick={() => removeTask(task._id)} className="todo-remove-button">
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Todo;
