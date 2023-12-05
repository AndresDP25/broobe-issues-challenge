import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export default function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorResponse, setErrorResponse] = useState("");


	const auth = useAuth();
	const goTo = useNavigate();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();

		try {
			const response = await fetch(`${import.meta.env.VITE_URL}/users`,{
				method:'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name,
					email,
					password
				}),
			});

			if(response.ok){
				setEmail("");
        		setPassword("");
        		setName("");
				goTo("/")
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
		<div  className="container">
			<form className="form" onSubmit={handleSubmit}>
				<h1 className="title">Sign up</h1>
				{!!errorResponse && <div className="errorMessage">{errorResponse}</div> }
				<label  htmlFor="name">Username</label>
				<input type="text"  id="name" value={name}  name="name" required onChange={(e) => setName(e.target.value)} />
			
				<label  htmlFor="email">Email</label>
				<input type="text" id="email" value={email} name="email" required onChange={(e) => setEmail(e.target.value)} />
			
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
			
				<button>Create User</button>
			</form>
		</div>
	</DefaultLayout>
  )
}
