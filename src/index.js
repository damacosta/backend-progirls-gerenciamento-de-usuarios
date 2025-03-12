const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { ParseServer } = require('parse-server');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

const api = new ParseServer({
    databaseURI: 'mongodb://admin:Y1QDz9L4hFclxrdaelLycUpF@MongoS3601A.back4app.com:27017/41fe412972294e73b1f6ad56a9501c1e',
    cloud: './cloud/main.js',
    appId: 'eAlcYywIW4MTRnn9A8Pq9zbFDIQnkwOKqKg10ZA0',
    masterKey: 'Oge1DHN82TrRNkdrE2jkT1vXcitwmxdcStXw7Hvb',
    serverURL: 'https://parseapi.back4app.com/'
});

app.use('/parse', api.app);

app.get('/', (req, res) => {
    res.send('Backend rodando no Back4App!');
});

app.use(bodyParser.json());

connectDB();

app.use('/api', userRoutes);
app.use('/api', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

