import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/auth/register/', { name:name, email:email, password:password });
            
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error signing up:', error.response.data);
            alert("Signup failed: " + (error.response?.data?.detail || "Unknown error"));
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    )

}

export default Signup;

