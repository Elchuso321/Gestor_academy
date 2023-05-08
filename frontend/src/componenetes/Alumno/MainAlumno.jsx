import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { HomeAlumno } from './HomeAlumno';
import { AuthProvider } from '../Ultimo/AuthContext';
 

export const MainAlumno=()=> {
  return (
    <div className="App">
        <AuthProvider>
          {/* <NavbarBasic/> */}
          {/* <Header/> */}
          <Routes>
          {/* element={HomePage} */}
            <Route element={< HomeAlumno/>} path="/"/>
            {/* <Route element={< />} path="/login"/>
            <Route element={</>} path="/register"/> */}
        </Routes>
        </AuthProvider>
        
    </div>
  );
}
