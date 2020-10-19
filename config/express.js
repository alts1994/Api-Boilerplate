const dotenv = require("dotenv").config();
const express = require("express");
const db = require("./db");
const helmet = require('helmet');

const app = express();

// so we can get the client's IP address
app.enable("trust proxy");

app.use(helmet());
app.use(express.json());

const recordsRouter = require('../routes/records');
app.use('/records', recordsRouter);

module.exports = app;