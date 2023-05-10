import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { AuthProvider } from '../Ultimo/AuthContext';
 
import { HomeAdmin } from './HomeAdmin';

export const MainAdmin=()=> {
  return (
    <div className="App">
        <AuthProvider>
          {/* <NavbarBasic/> */}
          {/* <Header/> */}
          <Routes>
          {/* element={HomePage} */}
            <Route element={< HomeAdmin/>} path="/"/>
            {/* <Route element={< />} path="/login"/>
            <Route element={</>} path="/register"/> */}
        </Routes>
        </AuthProvider>
        
    </div>
  );
}
