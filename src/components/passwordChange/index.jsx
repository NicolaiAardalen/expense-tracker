import React, { useState } from "react";
import { useAuth } from "../../contexts/authContexts";
import { Navigate } from "react-router-dom";
import { doPasswordChange } from "../../firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const PasswordChange = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { currentUser, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

    if (!currentUser) return <Navigate to="/login" replace />;

    const onSubmit = async (e) => {
        e.preventDefault();

        // Password match check
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Reauthenticate user with current password
            const credential = EmailAuthProvider.credential(
                currentUser.email,
                currentPassword
            );
            await reauthenticateWithCredential(currentUser, credential);

            // Update password
            await doPasswordChange(newPassword);

            setSuccessMessage("Password updated successfully!");
        } catch (error) {
            // Firebase throws an error if current password is wrong
            if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
                setErrorMessage("You need to input your correct current password!");
            } else {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
            {successMessage && <span style={{ color: "green" }}>{successMessage}</span>}
            <button type="submit">Confirm</button>
        </form>
    );
};

export default PasswordChange;
