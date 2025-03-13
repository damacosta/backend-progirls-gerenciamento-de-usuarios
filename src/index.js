const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Backend rodando no Back4App!');
});

app.use(bodyParser.json());

connectDB();

app.use('/api', userRoutes);
app.use('/api', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

