import './header.css';
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
                    <div className='firstDiv'>
                        <div>
                            <button className='header-links' onClick={handleLogout}>Logout</button>
                        </div>
                        <div className='secondDiv'>
                            <Link className='header-links' to={'/home'}>Home</Link>
                            <Link className='header-links' to={'/analytics'}>Analytics</Link>
                            <Link className='header-links' to={'/budget'}>Budget</Link>
                            <Link className='header-links' to={'/expenses'}>Expenses</Link>
                            <Link className='header-links' to={'/income'}>Income</Link>
                        </div>
                        <div>
                            <Link className='header-links' to={'/settings'}>Settings</Link>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    )
};

export default Header;