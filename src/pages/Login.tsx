import DefaultLayout from "../layout/DefaultLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const auth = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Validación de campos obligatorios
        if (!email || !password) {
            setErrorResponse('Please fill in all fields');
            return;
        }

        // Validación de formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.token) {
                    auth.saveToken(data.token);
                    auth.saveMail(email);
                }
            } else {
                const errorData = await response.json();
                setErrorResponse(errorData.message || 'Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to="dashboard" />;
    }

    return (
        <DefaultLayout>
            <>
                <div className="container">
                    <form className="form" onSubmit={handleSubmit}>
                        <h1 className="title">Log in</h1>
                        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
                        {!!emailError && <div className="errorMessage">{emailError}</div>}

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
                        {!!passwordError && <div className="errorMessage">{passwordError}</div>}

                        <button>Log in</button>
                        <p>
                            Don't have an account?
                            <Link to="/signup"> Sign up here</Link>
                        </p>
                    </form>
                </div>
            </>
        </DefaultLayout>
    );
}