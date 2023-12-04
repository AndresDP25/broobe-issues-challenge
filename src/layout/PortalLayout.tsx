import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();
  

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/me"></Link>
            </li>
            <li>
              <a href="#" onClick={()=> auth.signout()}>
                Sign out
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}
