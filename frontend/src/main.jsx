import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
// Componentes

import {BrowserRouter} from 'react-router-dom'
import { App } from './componenetes/Ultimo/MainApp';
// import './index.css';
import { InicioRoute } from './componenetes/Basico/InicioRoute';
// ReactDOM.createRoot(document.getElementById('root')).render(
//   //<React.StrictMode>
//   <BrowserRouter>
//     <InicioRoute/>
//   </BrowserRouter>
//   //</React.StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // <BrowserRouter>
    <App/>
  // </BrowserRouter>
  // </React.StrictMode>,
);