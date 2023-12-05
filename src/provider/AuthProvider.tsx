import { useState } from "react";
import AuthContext from "../context/AuthContext";

interface AuthProviderProps{
	children: React.ReactNode;
}


export default function AuthProvider({children}: AuthProviderProps) {

	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [accessToken, setAccessToken] = useState("");

	function getAccessToken() {
		return accessToken;
	}

	function signout() {
		localStorage.removeItem("token");
		setAccessToken("");
		setIsAuthenticated(false);
	  }

	function saveToken (token: string){
		localStorage.setItem("token", token);
		setIsAuthenticated(true);
	}

	  return (
		<AuthContext.Provider
		 value={{
			isAuthenticated, 
			getAccessToken, 
			saveToken,
			signout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}