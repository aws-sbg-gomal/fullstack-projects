/**
 * Apex Care - Application Entry Point
 * 
 * This is the main entry point for the React application.
 * It initializes the React DOM and renders the root App component.
 * 
 * @author Apex Care Development Team
 * @version 1.0.0
 * @description Entry point for the healthcare platform application
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Create React root and render the application
// React.StrictMode enables additional checks and warnings for development
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
