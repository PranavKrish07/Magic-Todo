import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ setAuth }) => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listName, setListName] = useState('');
    const [taskInputs, setTaskInputs] = useState({});
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setAuth(false);
        navigate('/login');
    };

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const response = await axios.get('/api/lists/', {
                    headers: { Authorization: `Bearer ${accessToken}` }
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

    const handleCreateList = async (e) => {
        e.preventDefault();
        if (!listName.trim()) return;
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.post('/api/lists/',
                { name: listName },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            setLists([...lists, response.data]);
            setListName('');
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    const handleCreateTask = async (listId) => {
        const taskText = taskInputs[listId];
        if (!taskText?.trim()) return;
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.post('/api/tasks/',
                { name: taskText, list: listId },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            setLists(lists.map(list => {
                if (list.id === listId) {
                    return { ...list, tasks: [...(list.tasks || []), response.data] };
                }
                return list;
            }));
            setTaskInputs({ ...taskInputs, [listId]: '' });
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleToggleTask = async (listId, taskId, currentStatus) => {
        try {
            const accessToken = localStorage.getItem('access_token');
            await axios.patch(`/api/tasks/${taskId}/`,
                { completed: !currentStatus },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            setLists(lists.map(list => {
                if (list.id === listId) {
                    return {
                        ...list,
                        tasks: list.tasks.map(task =>
                            task.id === taskId ? { ...task, completed: !currentStatus } : task
                        )
                    };
                }
                return list;
            }));
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    const handleDeleteList = async (listId) => {
        if (!window.confirm('Delete this entire list and all its tasks?')) return;
        try {
            const accessToken = localStorage.getItem('access_token');
            await axios.delete(`/api/lists/${listId}/`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setLists(lists.filter(list => list.id !== listId));
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    const handleDeleteTask = async (e, listId, taskId) => {
        e.stopPropagation();
        try {
            const accessToken = localStorage.getItem('access_token');
            await axios.delete(`/api/tasks/${taskId}/`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setLists(lists.map(list => {
                if (list.id === listId) {
                    return { ...list, tasks: list.tasks.filter(t => t.id !== taskId) };
                }
                return list;
            }));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const totalTasks = lists.reduce((sum, l) => sum + (l.tasks?.length || 0), 0);
    const completedTasks = lists.reduce((sum, l) => sum + (l.tasks?.filter(t => t.completed)?.length || 0), 0);

    // --- LOADING STATE ---
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 border-2 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
                    <p className="text-slate-400 text-sm animate-pulse">Loading your magic...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-teal-600/4 rounded-full blur-3xl pointer-events-none" />

            {/* ===== TOP NAVBAR ===== */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
                            <span className="text-white font-bold text-lg">✦</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            Magic<span className="text-teal-400">Todo</span>
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 text-slate-400 text-sm font-medium hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 cursor-pointer bg-transparent"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                        Logout
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">
                {/* ===== STATS BAR ===== */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        {
                            label: 'Total Lists',
                            value: lists.length,
                            icon: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            ),
                            color: 'teal'
                        },
                        {
                            label: 'Total Tasks',
                            value: totalTasks,
                            icon: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ),
                            color: 'teal'
                        },
                        {
                            label: 'Completed',
                            value: completedTasks,
                            icon: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            ),
                            color: 'teal'
                        }
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-5 hover:border-teal-500/20 transition-all duration-500 group"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="text-teal-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                    {stat.icon}
                                </div>
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</span>
                            </div>
                            <p className="text-3xl font-bold text-white group-hover:text-teal-400 transition-colors duration-500">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ===== CREATE LIST SECTION ===== */}
                <div className="mb-10">
                    <form onSubmit={handleCreateList} className="flex gap-3">
                        <div className="flex-1 relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-500/40">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Create a new list..."
                                value={listName}
                                onChange={(e) => setListName(e.target.value)}
                                autoComplete="off"
                                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60 text-white placeholder-slate-500 text-sm outline-none transition-all duration-300 focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/10 hover:border-slate-700"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:from-teal-500 hover:to-teal-400 transition-all duration-300 cursor-pointer flex items-center gap-2 whitespace-nowrap"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add List
                        </button>
                    </form>
                </div>

                {/* ===== LISTS HEADER ===== */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-white">My Lists</h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium">
                            {lists.length}
                        </span>
                    </div>
                </div>

                {/* ===== EMPTY STATE ===== */}
                {lists.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-900/60 border border-slate-800/50 flex items-center justify-center">
                            <svg className="w-8 h-8 text-teal-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">No lists yet</h3>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto">
                            Create your first list above and start organizing your tasks like magic ✨
                        </p>
                    </div>
                )}

                {/* ===== LISTS GRID ===== */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {lists.map((list, i) => {
                        const taskCount = list.tasks?.length || 0;
                        const doneCount = list.tasks?.filter(t => t.completed)?.length || 0;
                        const progress = taskCount > 0 ? (doneCount / taskCount) * 100 : 0;

                        return (
                            <div
                                key={list.id}
                                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-teal-500/20 transition-all duration-500 group hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/5"
                                style={{
                                    animation: 'fadeSlideUp 0.5s ease-out both',
                                    animationDelay: `${i * 80}ms`
                                }}
                            >
                                {/* List header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/15 flex items-center justify-center group-hover:from-teal-500/30 group-hover:to-teal-600/20 group-hover:border-teal-500/25 transition-all duration-500">
                                            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-white group-hover:text-teal-400 transition-colors duration-300">
                                                {list.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {doneCount}/{taskCount} tasks done
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteList(list.id)}
                                        className="p-2 rounded-lg text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 cursor-pointer bg-transparent border-0"
                                        title="Delete list"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Progress bar */}
                                {taskCount > 0 && (
                                    <div className="mb-5">
                                        <div className="h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-700 ease-out"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Task list */}
                                <div className="space-y-2 mb-4 max-h-52 overflow-y-auto pr-1">
                                    {list.tasks && list.tasks.map(task => (
                                        <div
                                            key={task.id}
                                            onClick={() => handleToggleTask(list.id, task.id, task.completed)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-300 group/task ${
                                                task.completed
                                                    ? 'bg-teal-500/5 hover:bg-teal-500/10'
                                                    : 'bg-slate-800/30 hover:bg-slate-800/60'
                                            }`}
                                        >
                                            <div className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                                                task.completed
                                                    ? 'border-teal-400 bg-teal-400/20'
                                                    : 'border-slate-600 group-hover/task:border-teal-500/40'
                                            }`}>
                                                {task.completed && (
                                                    <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className={`text-sm flex-1 transition-all duration-300 ${
                                                task.completed
                                                    ? 'text-slate-500 line-through'
                                                    : 'text-slate-200'
                                            }`}>
                                                {task.name}
                                            </span>
                                            <button
                                                onClick={(e) => handleDeleteTask(e, list.id, task.id)}
                                                className="flex-shrink-0 p-1 rounded-md text-slate-600 opacity-0 group-hover/task:opacity-100 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer bg-transparent border-0"
                                                title="Delete task"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Add task input */}
                                <div className="flex gap-2 mt-auto pt-3 border-t border-slate-800/40">
                                    <input
                                        type="text"
                                        placeholder="Add a task..."
                                        value={taskInputs[list.id] || ''}
                                        onChange={(e) => setTaskInputs({
                                            ...taskInputs,
                                            [list.id]: e.target.value
                                        })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleCreateTask(list.id);
                                            }
                                        }}
                                        className="flex-1 px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/30 text-white placeholder-slate-600 text-sm outline-none transition-all duration-300 focus:border-teal-500/30 focus:ring-1 focus:ring-teal-500/10 hover:border-slate-600/50"
                                    />
                                    <button
                                        onClick={() => handleCreateTask(list.id)}
                                        className="px-3 py-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500/20 hover:border-teal-500/30 transition-all duration-300 cursor-pointer"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Inline keyframe for staggered card entrance */}
            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Home;