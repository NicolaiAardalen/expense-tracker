import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContexts'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn, doSignOutUser, loading } = useAuth()
    if (loading) return <div>Loading...</div>;

    const handleLogout = async () => {
        await doSignOutUser()
        navigate('/login')
    }

    return (
        <nav>
            {userLoggedIn ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <Link to={'/home'}>Home</Link>
                    <Link to={'/settings'}>Settings</Link>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    )
}

export default Header