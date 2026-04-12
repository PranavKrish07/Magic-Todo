import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ setAuth }) => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listName, setListName] = useState('');
    
    // This object holds the text for each list's task input separately
    const [taskInputs, setTaskInputs] = useState({});
    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setAuth(false);
        navigate('/login');
    };

    // --- FETCHING DATA ---
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const response = await axios.get('/api/lists/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setLists(response.data);
            } catch (error) {
                console.error('Error fetching lists:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLists();
    }, []);

    // --- CREATING A LIST ---
    const handleCreateList = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.post('/api/lists/', 
                { name: listName },
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            );
            setLists([...lists, response.data]);
            setListName('');
        } catch (error) {
            console.error('Error creating list:', error);
            alert("Failed to create list.");
        }
    };

    // --- CREATING A TASK ---
    const handleCreateTask = async (listId) => {
        const taskText = taskInputs[listId];
        if (!taskText) return;

        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.post('/api/tasks/', 
                { 
                    name: taskText, 
                    list: listId  // This matches your 'list' field in Django
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            );

            // Update the UI by finding the correct list and adding the new task to it
            setLists(lists.map(list => {
                if (list.id === listId) {
                    return { ...list, tasks: [...(list.tasks || []), response.data] };
                }
                return list;
            }));

            // Clear the input for this specific list only
            setTaskInputs({ ...taskInputs, [listId]: '' });

        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    if (loading) return <div>Magic is happening...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
            <hr />

            {/* Form to create a New List */}
            <section>
                <h2>Create New List</h2>
                <form onSubmit={handleCreateList}>
                    <input
                        type="text"
                        placeholder="List name"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        autoComplete='off'
                    />
                    <button type="submit">Add List</button>
                </form>
            </section>

            <hr />

            <h2>My Lists</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {lists.map(list => (
                    <div key={list.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '15px', borderRadius: '8px', minWidth: '200px' }}>
                        <h3>{list.name}</h3>
                        
                        <div style={{ marginBottom: '10px' }}>
                            <input 
                                type="text"
                                placeholder="New task..."
                                value={taskInputs[list.id] || ''}
                                onChange={(e) => setTaskInputs({
                                    ...taskInputs,
                                    [list.id]: e.target.value
                                })}
                            />
                            <button onClick={() => handleCreateTask(list.id)}>Add</button>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {list.tasks && list.tasks.map(task => (
                                <li key={task.id}>
                                    <input type="checkbox" /> {task.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;