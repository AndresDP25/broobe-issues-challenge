import { useState, useEffect, createContext } from "react";

interface AuthProviderProps{
	children: React.ReactNode;
}

interface AuthContextType {
	isAuthenticated: boolean;
	email: string | null;
	getAccessToken: () => string;
	saveToken: (token: string) => void;
	saveMail: (email: string) => void;
	signout: () => void;
  }



export const AuthContext = createContext<AuthContextType>( {} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [accessToken, setAccessToken] = useState("");
	const [email, setEmail] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedEmail = localStorage.getItem("email");
		if (storedToken) {
			setIsAuthenticated(true);
			setAccessToken(storedToken);
			setEmail(storedEmail);
		}
		
	}, []);

	function getAccessToken() {
		return accessToken;
	}

	function signout() {
		localStorage.removeItem("token");
		localStorage.removeItem("email");
		setAccessToken("");
		setIsAuthenticated(false);
		setEmail(null);
	}

	function saveMail (email: any){
		localStorage.setItem("email", email);
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


