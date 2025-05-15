import React, { useEffect, useState } from 'react';
import './taskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item) => ({ title: item.title, completed: item.completed }));
        setTasks(formatted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { title: input.trim(), completed: false }]);
    setInput('');
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const completeTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading tasks...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

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
            <li key={i} style={{ backgroundColor: task.completed ? '#d4edda' : '' }}>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </span>
              <div>
                <button onClick={() => completeTask(i)}>✅</button>
                <button onClick={() => deleteTask(i)}>❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
 