import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { HomeAlumno } from './HomeAlumno';

import { Muestra } from './Muestra';
import { DetalleClase } from './DetalleClase';
import { AuthProvider } from '../Ultimo/AuthContext';

import { useParams } from 'react-router-dom';


export const MainAlumno=()=> {
  return (
    <div className="App">
        <AuthProvider>
          {/* <NavbarBasic/> */}
          {/* <Header/> */}
          <Routes>
          {/* element={HomePage} */}
            <Route element={<HomeAlumno/>} path="/"/>
            <Route element={<DetalleClase/>} path="/clase"/>
            
            {/* <Route element={<Muestra/>} path="/muestra"/> */}
            
            {/* <Route element={< HomeAlumno/>} path="/"/> */}
            {/* <Route element={< />} path="/login"/>
            <Route element={</>} path="/register"/> */}
        </Routes>
        </AuthProvider>
        
    </div>
  );
}
