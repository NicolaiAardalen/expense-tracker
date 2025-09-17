import React from "react";
import { useAuth } from "../../contexts/authContexts";
import { Navigate } from "react-router-dom";


const Home = () => {
    const { currentUser, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

    // Safe guard
    if (!currentUser) return <Navigate to="/login" replace />;

    return (
        <>
        <div>
            Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
        </div>
        </>
    )
}

export default Home