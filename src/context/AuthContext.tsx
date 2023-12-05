import { useContext, createContext } from "react";


const AuthContext = createContext({
	isAuthenticated: false,
	getAccessToken: () => {},
	saveToken : (_token: string) => {},
	signout: () => {},
});

export default AuthContext;


export const useAuth = () => useContext(AuthContext);
