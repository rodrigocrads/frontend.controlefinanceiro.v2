function Login() {
    window.location.href=`${process.env.REACT_APP_API_DOMAIN}oauth/authorize?client_id=${process.env.REACT_APP_API_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_API_REDIRECT_URI}&response_type=code&scope=`;

    return false;
}

export default Login;