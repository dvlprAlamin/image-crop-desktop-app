import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import CropImage from './components/CropImage/CropImage';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<CropImage />} />
        </Routes>
      </Router>
    </>
  );
}
