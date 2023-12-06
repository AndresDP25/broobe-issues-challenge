import { useState, useEffect, createContext } from "react";

interface AuthProviderProps{
	children: React.ReactNode;
}

export const AuthContext = createContext<any>(null);

// 2.Crear el Provider, para proveer el contexto.
export function AuthProvider({ children }: AuthProviderProps) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [accessToken, setAccessToken] = useState("");
	const [email, setEmail] = useState(null);

	useEffect(() => {
		
		const storedToken = localStorage.getItem("token");
		if (storedToken) {
			setIsAuthenticated(true);
			setAccessToken(storedToken);
		}
	}, []);

	function getAccessToken() {
		return accessToken;
	}

	function signout() {
		localStorage.removeItem("token");
		setAccessToken("");
		setIsAuthenticated(false);
	}

	function saveMail (email: any){
		setEmail(email);
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
			saveMail,
			email,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

