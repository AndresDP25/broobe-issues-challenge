import DefaultLayout from "../layout/DefaultLayout"
import { Link } from "react-router-dom";
import { useState } from "react"
import { useAuth } from "../context/AuthProvider";
import { Navigate } from 'react-router-dom'
import { API_URL } from "../context/constants";
import { AuthResponse } from "../types/types";
import './Login.css';


export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorResponse, setErrorResponse] = useState("");

	const auth = useAuth();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();

		try {
			const response = await fetch(`${API_URL}/login`,{
				method:'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email,
					password
				}),
			});

			if(response.ok){
				const json = (await response.json()) as AuthResponse;

				if(json){
					auth.saveToken(json);
				} 
			} else {
				setErrorResponse('Something went wrong');
			}
		} catch (error) {
			console.log(error)
		}
	}

	if (auth.isAuthenticated){
		return <Navigate to="dashboard" />
	}

	return (
		<DefaultLayout>
			<>
				<form className="form"  onSubmit={handleSubmit}>
					<h1 className="log">Log in</h1>
					{!!errorResponse && <div className="errorMessage">{errorResponse}</div> }
					<label>Email</label>
					<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

					<label>Password</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

					<button>Log in</button>
					<p>
						Don't have an account?  
						<Link to="/signup"> Sign up here</Link>
					</p>
				</form>

			</>
		</DefaultLayout>
	)
}
