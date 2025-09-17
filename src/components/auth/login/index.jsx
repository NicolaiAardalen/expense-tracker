import React, { useState } from "react";
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContexts";

const Login = () => {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isSigningIn) return;

        setSigningIn(true);
        setErrorMessage('');

        try {
            await doSignInWithEmailAndPassword(email.trim(), password);
            // navigation will happen automatically if userLoggedIn changes
        } catch (error) {
            setErrorMessage("e-mail or password is wrong!");
        } finally {
            setSigningIn(false);
        }
    };

    return (
        <div>
            {userLoggedIn && (<Navigate to="/home" replace={true}/>)}

            <form onSubmit={onSubmit}>
                <input 
                    type="email" 
                    placeholder="Email"
                    required 
                    value={email} 
                    onChange={(e) =>  setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    autoComplete="current-password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                {errorMessage && (
                    <span>{errorMessage}</span>
                )}

                <button type="submit" disabled={isSigningIn}>{isSigningIn ? 'Signing In...' : 'Sign In'}</button>
            </form>
        </div>
    )
}

export default Login