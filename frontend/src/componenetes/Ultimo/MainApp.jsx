import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import PrivateRoute from './PrivateRoute'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import Header from './Headers'
import { RegisterForm } from '../conexion/register/RegisterComponente'
import { NavbarBasic } from '../Basico/NavbarBasic'
import { Home } from '../Basico/Home'

export const App=()=> {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* <NavbarBasic/> */}
          {/* <Header/> */}
          <Routes>
          {/* element={HomePage} */}
            <Route element={<Home />} path="/"/>
            <Route element={<LoginPage />} path="/login"/>
            <Route element={<RegisterForm/>} path="/register"/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}
