import { useContext, createContext } from "react";


const AuthContext = createContext({
	isAuthenticated: false,
	email: null,
	getAccessToken: () => {},
	saveToken : (_token: string) => {},
	saveMail : (_email: string) => {},
	signout: () => {},
});

export default AuthContext;


export const useAuth = () => useContext(AuthContext);
