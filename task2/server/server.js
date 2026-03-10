import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, text: 'Complete Task 1 Portfolio', completed: true },
    { id: 2, text: 'Start Task 2 Management App', completed: false },
];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.map(t => t.id == id ? { ...t, ...req.body } : t);
    res.json({ message: 'Task updated' });
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
    console.log(`Task Manager API running on port ${PORT}`);
});
