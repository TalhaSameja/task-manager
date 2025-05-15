import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './taskList';
import About from './About';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', textAlign: 'center' }}>
        <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
