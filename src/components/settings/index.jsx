import React, { useState } from "react";
import { useAuth } from "../../contexts/authContexts";
import { Navigate, Link } from "react-router-dom";
import { doUpdateEmailAndUsername } from "../../firebase/auth";


const Settings = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [currentPassword, setCurrentPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState("");

    const { currentUser, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

    // Safe guard
    if (!currentUser) return <Navigate to="/login" replace />;

    const onSubmit = async (e) => {
            e.preventDefault()
            setErrorMessage('')
            setSuccessMessage("");

            try {
                const result = await doUpdateEmailAndUsername(email, username, currentPassword);
                if (result?.message) {
                    setSuccessMessage(result.message);
                } else {
                    setSuccessMessage("Profile updated successfully!");
                }
            } catch (error) {
                setErrorMessage(error.message)
            }
        }

    return (
        <>
        <form onSubmit={onSubmit}>
            <input 
                type="email"
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
            />
            {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
            {successMessage && <span style={{ color: "green" }}>{successMessage}</span>}
            <button type="submit">Confirm</button>
        </form>
        <Link to={'/passwordChange'}>Change password</Link>
        </>
    )
}

export default Settings