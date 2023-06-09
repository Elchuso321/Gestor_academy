import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './AuthContext'
import { BrowserRouter as Router} from 'react-router-dom'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return(
            <Route {...rest}>{!user ? <Navigate to="/login" /> : children}</Route>
    )
}

export default PrivateRoute;