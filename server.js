require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const helmet = require('helmet');

app.use(helmet());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

const recordsRouter = require('./routes/records');
app.use('/records', recordsRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter)

app.listen(3000, () => console.log('listening on port 3000'));