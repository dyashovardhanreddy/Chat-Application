import { NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {

    const isAuthenticated = !!localStorage.getItem('jwtToken');

    return (
        <div className="navbar">
            {isAuthenticated? (
                <ul>
                    <NavLink to='/'><li>Home</li></NavLink>
                </ul>
            ) : (
                <ul>
                    <NavLink to='/chat-app/auth/login'><li>Login</li></NavLink>
                    <NavLink to='/chat-app/auth/register'><li>Register</li></NavLink>
                </ul>
            ) }
        </div>
        
    )
}