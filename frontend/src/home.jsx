import { useNavigate } from 'react-router-dom';
const Home = ({setAuth}) => {
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuth(false); 
    navigate('/login');
    };

    return(
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default Home;