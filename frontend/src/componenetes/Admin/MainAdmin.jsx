import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { AuthProvider } from '../Ultimo/AuthContext';
import React, {  useEffect,useState } from 'react';
import { HomeAdmin } from './HomeAdmin';
import { HomeAcademia } from './HomeAcademia';
import { AdminAlumnos } from '../Gestion/AdminAlumnos';
import { AdminBoletines } from '../Gestion/AdminBoletines';
import { AdminProfesores } from '../Gestion/AdminProfesores';
import { AdminPagos } from '../Gestion/AdminPagos';
import { AdminClases } from '../Gestion/AdminClases';
import { AdminAulas } from '../Gestion/AdminAulas';
import { AdminEventos } from '../Gestion/AdminEventos';
import { VistaDetalleClase } from '../Datos/VistaDetalleClase';
import { DetalleProfesor } from '../Datos/VistaDetalleProfesor';
import { DetalleAlumno } from '../Datos/VistaDetalleAlumno';
import { ComponenteChanel1 } from '../Chat2/ComponenteChat2';
import { ConversacionesAdmin } from './ConversacionAdmin';
import { LoginConfirmation } from '../Basico/ConfirmacionUser';
import NoPermissionsError from './NoDeberiasEstar';
export const MainAdmin=()=> {
  const [group, setGroup] =useState("");
  useEffect(() => {
    const group =JSON.parse(localStorage.getItem('group'));
    console.log(group);
    setGroup(group);
  }, [])
  // const group =JSON.parse(localStorage.getItem('group'));
  return (
    <div className="App">
        <AuthProvider>
          {/* <NavbarBasic/> */}
          {/* <Header/> */}
          <Routes>
          {/* element={HomePage} */}
            <Route  element={<LoginConfirmation/>} path="/academia/confirmacion/"/>
            <Route element={< HomeAdmin/>} path="/"/>
            {group==="Admin" && <>
            <Route element={< HomeAcademia/>} path="/academia"/>
            

            <Route element={< HomeAcademia/>} path="/gestionPagina"/>
            <Route element={< AdminAlumnos/>} path="/academia/alumnos"/>
            <Route element={< AdminBoletines/>} path="/academia/boletines"/>
            <Route element={< AdminClases/>} path="/academia/clases"/>
            <Route element={< AdminPagos/>} path="/academia/pagos"/>
            <Route element={< AdminProfesores/>} path="/academia/profesores"/>
            <Route element={< AdminAulas/>} path="/academia/aulas"/>
            <Route element={< AdminEventos/>} path="/academia/eventos"/>
            <Route  element={<VistaDetalleClase/>} path="/academia/clases/:numId"/>
            <Route  element={<DetalleProfesor/>} path="/academia/profesor/:numId"/>
            <Route  element={<DetalleAlumno/>} path="/academia/alumno/:numId"/>
            <Route  element={<ConversacionesAdmin/>} path="/academia/clase/chat/:numId"/>
            </>
             }
            {/* <Route element={< HomeAcademia/>} path="/academia"/>
            

            <Route element={< NoPermissionsError/>} path="/gestionPagina"/>
            <Route element={< NoPermissionsError/>} path="/academia/alumnos"/>
            <Route element={< NoPermissionsError/>} path="/academia/boletines"/>
            <Route element={< NoPermissionsError/>} path="/academia/clases"/>
            <Route element={< NoPermissionsError/>} path="/academia/pagos"/>
            <Route element={< NoPermissionsError/>} path="/academia/profesores"/>
            <Route element={< NoPermissionsError/>} path="/academia/aulas"/>
            <Route element={< NoPermissionsError/>} path="/academia/eventos"/>
            <Route  element={<NoPermissionsError/>} path="/academia/clases/:numId"/>
            <Route  element={<NoPermissionsError/>} path="/academia/profesor/:numId"/>
            <Route  element={<NoPermissionsError/>} path="/academia/alumno/:numId"/>
            <Route  element={<NoPermissionsError/>} path="/academia/clase/chat/:numId"/>
            
            
             */}
            {/* <Route element={< />} path="/login"/>
            <Route element={</>} path="/register"/> */}
        </Routes>
        </AuthProvider>
        
    </div>
  );
}
