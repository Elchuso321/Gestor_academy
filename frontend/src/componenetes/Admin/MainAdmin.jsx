import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { AuthProvider } from '../Ultimo/AuthContext';
 
import { HomeAdmin } from './HomeAdmin';
import { HomeAcademia } from './HomeAcademia';
import { AdminAlumnos } from '../Gestion/AdminAlumnos';
import { AdminBoletines } from '../Gestion/AdminBoletines';
import { AdminProfesores } from '../Gestion/AdminProfesores';
import { AdminPagos } from '../Gestion/AdminPagos';
import { AdminClases } from '../Gestion/AdminClases';
import { AdminAulas } from '../Gestion/AdminAulas';
import { AdminEventos } from '../Gestion/AdminEventos';
export const MainAdmin=()=> {
  return (
    <div className="App">
        <AuthProvider>
          {/* <NavbarBasic/> */}
          {/* <Header/> */}
          <Routes>
          {/* element={HomePage} */}
            <Route element={< HomeAdmin/>} path="/"/>
            <Route element={< HomeAcademia/>} path="/academia"/>
            <Route element={< HomeAcademia/>} path="/gestionPagina"/>
            <Route element={< AdminAlumnos/>} path="/academia/alumnos"/>
            <Route element={< AdminBoletines/>} path="/academia/boletines"/>
            <Route element={< AdminClases/>} path="/academia/clases"/>
            <Route element={< AdminPagos/>} path="/academia/pagos"/>
            <Route element={< AdminProfesores/>} path="/academia/profesores"/>
            <Route element={< AdminAulas/>} path="/academia/aulas"/>
            <Route element={< AdminEventos/>} path="/academia/eventos"/>
            
            
            {/* <Route element={< />} path="/login"/>
            <Route element={</>} path="/register"/> */}
        </Routes>
        </AuthProvider>
        
    </div>
  );
}
