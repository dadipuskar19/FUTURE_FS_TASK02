import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

function App() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Complete Task 1 Portfolio', completed: true },
        { id: 2, text: 'Start Task 2 Management App', completed: false },
    ]);
    const [inputText, setInputText] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: inputText, completed: false }]);
        setInputText('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-indigo-400">Task Manager</h1>

                <form onSubmit={addTask} className="flex gap-2 mb-8">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500"
                        placeholder="Add a new task..."
                    />
                    <button className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-lg transition-colors">
                        <Plus size={24} />
                    </button>
                </form>

                <div className="space-y-3">
                    {tasks.map(task => (
                        <div key={task.id} className="bg-slate-800 p-4 rounded-xl flex items-center justify-between group">
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTask(task.id)}>
                                {task.completed ? <CheckCircle className="text-indigo-400" /> : <Circle className="text-slate-500" />}
                                <span className={task.completed ? 'line-through text-slate-500' : ''}>{task.text}</span>
                            </div>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
