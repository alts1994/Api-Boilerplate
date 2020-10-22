const dotenv = require("dotenv").config();
const db = require("./db");
const helmet = require('helmet');
const container = require('./configContainer');
const express = require('express');

const app = express();

// so we can get the client's IP address
app.enable("trust proxy");

app.use(helmet());
app.use(express.json());


const recordRouter = container.resolve('recordRouter')
app.use('/records', recordRouter);

const userRouter = container.resolve('userRouter')
app.use('/user', userRouter);

const authRouter = container.resolve('authRouter');
app.use('/auth', authRouter);


module.exports = app;