import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { HomeAlumno } from './HomeAlumno';
import { AuthProvider } from '../Ultimo/AuthContext';
import { Muestra } from './Muestra';
import { DetalleClase } from './DetalleClase';

 


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
            
            <Route element={<Muestra/>} path="/muestra"/>
            {/* <Route element={< HomeAlumno/>} path="/"/> */}
            {/* <Route element={< />} path="/login"/>
            <Route element={</>} path="/register"/> */}
        </Routes>
        </AuthProvider>
        
    </div>
  );
}
