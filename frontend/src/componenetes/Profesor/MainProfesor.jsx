import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { AuthProvider } from '../Ultimo/AuthContext';
import { HomeProfesor } from './HomeProfesor';
 

export const MainProfesor=()=> {
  return (
    <div >
        <AuthProvider>
          {/* <NavbarBasic/> */}
          {/* <Header/> */}
          <Routes>
          {/* element={HomePage} */}
            <Route element={< HomeProfesor/>} path="/"/>
            {/* <Route element={< />} path="/login"/>
            <Route element={</>} path="/register"/> */}
        </Routes>
        </AuthProvider>
        
    </div>
  );
}
