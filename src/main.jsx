import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Todo from './Todo.jsx';
import About from './About.jsx'; // You'll create this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <nav style={{ textAlign: 'center', margin: '15px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
