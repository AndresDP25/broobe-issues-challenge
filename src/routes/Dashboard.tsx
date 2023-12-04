import { useState, useEffect } from "react";
import { API_URL } from "../context/constants";
import PortalLayout from "../layout/PortalLayout";
import "./Dashboard.css"


interface Issue {
  id: number;
  name: string;
  description: string;
  priority_id: number
}

export default function Dashboard() {
  // const auth = useAuth();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  async function getIssues() {
    const accessTokenObject = localStorage.getItem('token');
    const accessTokenJson = JSON.parse(accessTokenObject || '{}');

    const accessToken = accessTokenJson.token;

    try {

      const response = await fetch(`${API_URL}/issues`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setIssues(json);
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function createIssues() {
      const accessTokenObject = localStorage.getItem('token');
      const accessTokenJson = JSON.parse(accessTokenObject || '{}');

      const accessToken = accessTokenJson.token;
      try {
        const response = await fetch(`${API_URL}/issues`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name, description, priority }),
        });
        if (response.ok) {
          const issue = (await response.json()) as Issue;
          setIssues([...issues, issue]);
        }
      } catch (error) { }
  }

  useEffect(() => {
    getIssues();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createIssues();
  }
  return (
    <PortalLayout>
      <main className="dashboard">
        <aside>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div className="flex-i">
                <div className="sep">
                <input className="add"
                  type="text"
                  placeholder="Name Issue"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input className="add"
                  type="text"
                  placeholder="Description Issue"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input className="add"
                  type="text"
                  placeholder="Priority Issue"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                />
                </div>
                <div>
                  <button className="add-button">ADD ISSUE</button>
                </div>
              </div>
            </div>
          </form>
        </aside>
        <section>
          <div>
            <h1>List off Issues</h1>
            {issues.length == 0
              ? "there are no issues"
              : issues.map((post: Issue) => (
                <div key={post.id} className="text">
                  <h3>{post.name}</h3>
                  <p><strong>- Priority: {post.id}</strong><br />{post.description}</p>
                  <div >
                    <button className="gap">UPDATE</button>
                    <button className="gap">DELETE</button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </PortalLayout>
  )
}
