import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
// Componentes

import {BrowserRouter} from 'react-router-dom'
import { Login } from './componenetes/Login'
// import './index.css';
// import { Inicio, InicioRoute } from './componenetes/InicioRoute';
ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <BrowserRouter>
    <InicioRoute/>
  </BrowserRouter>
  //</React.StrictMode>,
)

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>,
// )
