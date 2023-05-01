import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './AuthContext'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to="/" >Home</Link>
            <span> | </span>
            {user ? (
                 <button onClick={logoutUser}>Logout</button>
            ): (
                <Link to="/login" >Login</Link>
            )}
            <span> | </span>
            <Link to="/register" >Register</Link>
            {user &&   <p>Hello {user.username}</p>}
           
        </div>
    )
}

export default Header