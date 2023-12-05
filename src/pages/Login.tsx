import DefaultLayout from "../layout/DefaultLayout"
import { Link } from "react-router-dom";
import { useState } from "react"
import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom'
import './Login.css';



export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorResponse, setErrorResponse] = useState("");
	console.log(import.meta.env.VITE_URL)

	const auth = useAuth();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();

		try {
			const response = await fetch(`${import.meta.env.VITE_URL}/login`,{
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
				const data = await response.json();

				if(data.token){
					auth.saveToken(data.token);
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
				<div className="container">
					<form className="form"  onSubmit={handleSubmit}>
						<h1 className="title">Log in</h1>
						{!!errorResponse && <div className="errorMessage">{errorResponse}</div> }
						<label htmlFor="email">Email</label>
						<input type="text" id="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
					
						<label  htmlFor="password">Password</label>
						<input type="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
					
						<button>Log in</button>
						<p>
							Don't have an account?  
							<Link to="/signup"> Sign up here</Link>
						</p>
					</form>
				</div>

			</>
		</DefaultLayout>
	)
}
