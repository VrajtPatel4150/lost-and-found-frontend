// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/index.css'; // ✅ This should point to the merged version
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
