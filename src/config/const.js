const DOMAIN = "http://10.0.2.2:8080"
const ValidateEmail = (email) => {
	// Email validation regex pattern
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};
class Token {
	// Only use this in login
	SetToken(token, timeout){
		this.token = token;
		this.timeout = timeout;
		// Implement save to storage
	}
	GetToken(token, timeout){
		this.token = token
		this.timeout = timeout
	}
	Token(){
		// Need to be implement
		// Read from read token from file
		// If token not found token = null
	}
}
const TOKEN = new Token();
export{DOMAIN, ValidateEmail, TOKEN};
