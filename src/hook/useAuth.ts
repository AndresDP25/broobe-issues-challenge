import { useContext } from "react";
import { AuthContext  } from "../context/Auth";

export function useAuth (){

	const {
	isAuthenticated,
	email,
	getAccessToken,
	saveToken,
	saveMail,
	signout,
} = useContext(AuthContext);

return { isAuthenticated, email, getAccessToken, saveToken, saveMail, signout  }
}



