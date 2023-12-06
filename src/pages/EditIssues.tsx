import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useNavigate, useSearchParams } from 'react-router-dom';


export default function Dashboard() {

	const [searchParams] = useSearchParams();
	const [name, setName] = useState(searchParams.get('name') || "");
	const [description, setDescription] = useState(searchParams.get('description') || "");
	const [priority, setPriority] = useState(searchParams.get('priority_id') || "");
	const [issueId] = useState(searchParams.get('id') || "");

	const goTo = useNavigate();


	async function updateIssues() {
		const accessToken = localStorage.getItem('token');

		const shouldDelete = window.confirm("Are you sure you want to update this issue?");

		if (!shouldDelete) {
			return; // No realizar la eliminación si el usuario cancela
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_URL}/issues/${issueId}`, {
				method: "PATCH",
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
			} else {
				console.log(response)
			}
		} catch (error) {
			console.log(error);
		}
	}
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		updateIssues();
	}


	return (
		<PortalLayout>
			<div className="container">
				<form className="form" onSubmit={handleSubmit}>
					<h1 className="title">UPDATE ISSUE</h1>
					<div className="container-d container">
						<input className="inpt"
							type="text"
							id="name"
							placeholder="Issue Name"
							value={name}
							required
							onChange={(e) => setName(e.target.value)}
						/>

						<input className="inpt"
							id="description"
							type="text"
							placeholder="Issue Description"
							value={description}
							required
							onChange={(e) => setDescription(e.target.value)}
						/>
						<input className="inpt"
							type="text"
							id="priority"
							placeholder="Issue Priority "
							value={priority}
							required
							onChange={(e) => setPriority(e.target.value)}
						/>
					</div>
					<div>
						<button className="btn">UPDATE ISSUE</button>
					</div>
				</form>
			</div>
		</PortalLayout>
	)
}