import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import CropImage from './components/CropImage/CropImage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CropImage />} />
      </Routes>
    </Router>
  );
}
