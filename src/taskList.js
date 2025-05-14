import React, { useState } from 'react';
import './taskList.css';


function TaskList() {

  const [tasks, setTasks] = useState([
    'Buy groceries',
    'Finish React assignment',
    'Walk the dog'
  ]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, input.trim()]);
    setInput('');
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="task-container">
        <div className="task-box">
            <h2>Task Manager</h2>
            <input
                type="text"
                value={input}
                placeholder="Enter a task"
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addTask}>Add</button>

            <ul>
                {tasks.map((task, i) => (
                <li key={i}>
                    {task} <button onClick={() => deleteTask(i)}>❌</button>
                </li>
                ))}
            </ul>
        </div>
  </div>
  );
}

export default TaskList;
