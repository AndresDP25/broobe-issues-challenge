import { useState, useEffect } from "react";
import PortalLayout from "../layout/PortalLayout";
import "./Dashboard.css"
import { Link } from "react-router-dom";

interface Issue {
  id: number;
  name: string;
  description: string;
  priority_id: number
}

export default function Dashboard() {

  const [issues, setIssues] = useState<Issue[]>([]);


  async function getIssues() {
    const accessToken = localStorage.getItem('token');

    try {

      const response = await fetch(`${import.meta.env.VITE_URL}/issues`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIssues(data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDelete(id: number) {
    const accessToken = localStorage.getItem('token');
    const shouldDelete = window.confirm("Are you sure you want to delete this issue?");

    if (!shouldDelete) {
      return; 
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/issues/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        getIssues()
      } else {
        console.error("Failed to delete issue:", response.status, response.statusText);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getIssues();
  }, []);


  return (
    <PortalLayout>
      <main className="section">
        <div className="container-d">
          <div className="container-r">
            <h1 className="List">List of Issues</h1>
            <div>
              <Link to="/addissues">
                <button className="add-button">ADD ISSUE</button>
              </Link>
            </div>
          </div>
          {issues.length === 0
            ? <div className="no-issues-message">
              <p>There are no issues 😀</p>
            </div>
            : issues.map((post: Issue) => (
              <div key={post.id} className="card">
                <h2 className="title">{post.name}</h2>
                <p>{post.description}</p>
                <h3><strong>Priority: {post.priority_id}</strong></h3>
                <div >
                  <Link to={`/editissues?name=${post.name}&description=${post.description}&priority_id=${post.priority_id}&id=${post.id}`}>
                    <button className="gap">UPDATE</button>
                  </Link>
                  <button className="gap" onClick={() => handleDelete(post.id)}>DELETE</button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </PortalLayout>
  )
}
