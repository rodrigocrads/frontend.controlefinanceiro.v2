function Login() {
    return window.location.href='http://localhost:8000/oauth/authorize?client_id=1&redirect_uri=http://localhost:3000/auth/callback&response_type=code&scope=';
}

export default Login;