import { useState } from "react";
import { doPasswordReset } from "../../firebase/auth";

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage('');
        setSuccessMessage('');

        try {
            await doPasswordReset(email);
            setSuccessMessage("We have sent a password reset email to your email!")
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
            {successMessage && <span style={{ color: "green" }}>{successMessage}</span>}
            <button type="submit">Confirm</button>
        </form>
    );
};

export default PasswordReset;