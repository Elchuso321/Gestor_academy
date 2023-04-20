import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Componentes
import { Login } from './componenetes/Login'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)
