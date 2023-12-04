export interface AuthResponse {
		accessToken: string;
}

export interface AuthResponseError {
	body: {
		message: string;
	};
}

