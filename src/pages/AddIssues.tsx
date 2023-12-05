import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";

interface Issue {
	id?: number;
	name: string;
	description: string;
	priority_id: number
}

export default function Dashboard() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [issues, setIssues] = useState<Issue | null>(null);

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
			const issue = (await response.json()) as Issue;
			setName("");
        	setDescription("");
        	setPriority("");
		  } else console.log("Failed to create issue:", response.status, response.statusText)
		} catch (error) {
			console.log(error);
		 }
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		createIssue();
	  }

	  
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
						<button type="submit" className="btn">ADD ISSUE</button>
					</div>
				</form>
			</div>
		</PortalLayout>
	)
}