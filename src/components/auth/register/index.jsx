import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContexts'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'

const Register = () => {
    const { userLoggedIn } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

         // Password match check
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match")
            return
        }

        setIsRegistering(true)
        setErrorMessage('')

        try {
            await doCreateUserWithEmailAndPassword(email.trim(), password, username.trim())
            navigate('/home')
        } catch (error) {
            setErrorMessage(error.message) // show Firebase error
        } finally {
            setIsRegistering(false)
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <form onSubmit={onSubmit}>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                />
                {errorMessage && (
                    <span style={{ color: 'red' }}>{errorMessage}</span>
                )}

                <button type="submit" disabled={isRegistering}>
                    {isRegistering ? 'Registering...' : 'Register'}
                </button>
            </form>
        </>
    )
}

export default Register