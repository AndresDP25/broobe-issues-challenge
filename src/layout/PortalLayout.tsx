import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import './PortalLayout.css'


interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();

  return (
    <>
      <header>
        <nav>
          <ul className="navbar">
            <div>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <a href="#" onClick={()=> auth.signout()}>
                  Sign out
                </a>
              </li>
            </div>
            <div>
              <li>User: {auth.email}</li>
            </div>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}
