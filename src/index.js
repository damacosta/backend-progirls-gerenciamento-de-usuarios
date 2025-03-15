const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const corsMiddleware = require('./middlewares/corsMiddleware');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Backend rodando no Back4App!');
});

app.use(corsMiddleware);

app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use('/api', userRoutes);
app.use('/api', authRoutes);

app.get('/api/users', authMiddleware, (req, res) => {
    res.json({ message: 'Usuários autenticados', user: req.user });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));