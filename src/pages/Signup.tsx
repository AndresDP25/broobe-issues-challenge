import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorResponse, setErrorResponse] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Validación de campos obligatorios
        if (!name || !email || !password) {
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
            const response = await fetch(`${import.meta.env.VITE_URL}/users`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                }),
            });

            if (response.ok) {
                setEmail("");
                setPassword("");
                setName("");
                goTo("/")
            } else {
                const errorData = await response.json();
                setErrorResponse(errorData.message || 'Something went wrong');
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to="dashboard" />;
    }

    return (
        <DefaultLayout>
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="title">Sign up</h1>
                    {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                    <label htmlFor="name">Username</label>
                    <input type="text" id="name" value={name} name="name" onChange={(e) => { setName(e.target.value); setNameError(''); }} />
                    {!!nameError && <div className="errorMessage">{nameError}</div>}

                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={email} name="email" onChange={(e) => { setEmail(e.target.value); setEmailError(''); }} />
                    {!!emailError && <div className="errorMessage">{emailError}</div>}

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} />
                    {!!passwordError && <div className="errorMessage">{passwordError}</div>}

                    <button>Create User</button>
                </form>
            </div>
        </DefaultLayout>
    )
}