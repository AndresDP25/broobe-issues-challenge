import { useContext, createContext, useState } from "react";

interface AuthProviderProps{
	children: React.ReactNode;
}

const AuthContext = createContext({
	isAuthenticated: false,
	getAccessToken: () => {},
	saveToken : (_token: object) => {},
	signout: () => {},
});

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

	function saveToken (token: object){
		const tokenString = JSON.stringify(token);
		localStorage.setItem("token", tokenString);
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

export const useAuth = () => useContext(AuthContext);
