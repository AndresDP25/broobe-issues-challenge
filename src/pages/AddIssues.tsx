import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useNavigate } from 'react-router-dom';
import { isValidLettersOnly, isValidPriority } from '../hook/useValidate';

export default function Dashboard() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");

	const goTo = useNavigate();


	async function createIssue() {
		const accessToken = localStorage.getItem('token');

		try {
			const response = await fetch(`${import.meta.env.VITE_URL}/issues`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({ name, description, priority_id: priority }),
			});
			if (response.ok) {

				setName("");
				setDescription("");
				setPriority("");
				goTo("/dashboard")
			} else console.log("Failed to create issue:", response.status, response.statusText)
		} catch (error) {
			console.log(error);
		}
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		createIssue();
	}

	const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;


		if (isValidPriority(inputValue)) {
			setPriority(inputValue);
		}
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
	  
		if (isValidLettersOnly(inputValue)) {
		  setName(inputValue);
		}
	};

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
	  
		if (isValidLettersOnly(inputValue)) {
		  setDescription(inputValue);
		}
	};

	return (
		<PortalLayout>
			<div className="container">
				<form className="form" onSubmit={handleSubmit}>
					<h1 className="title">Create Issue</h1>
					<div className="container-d container">
						<input className="inpt"
							type="text"
							id="name"
							placeholder="Issue Name"
							value={name}
							required
							onChange={handleNameChange}
						/>

						<input className="inpt"
							id="description"
							type="text"
							placeholder="Issue Description"
							value={description}
							required
							onChange={handleDescriptionChange}
						/>
						<input className="inpt"
							type="text"
							id="priority"
							placeholder="Issue Priority: 1 - 4"
							value={priority}
							required
							onChange={handlePriorityChange}
						/>
					</div>
					<div>
						<button type="submit" className="btn">ADD ISSUE</button>
					</div>
				</form>
			</div>
		</PortalLayout>
	)
}