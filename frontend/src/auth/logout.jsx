import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuth }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Clear the tokens from LocalStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // 2. Update the App's state to 'false'
        // This triggers the redirect logic in App.jsx
        setAuth(false);

        // 3. Send the user back to the login page (or landing page)
        navigate('/login');
    }, [setAuth, navigate]);

    // This component doesn't need to render anything 
    // because it redirects immediately.
    return null; 
};

export default Logout;