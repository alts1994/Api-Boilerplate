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

/*app.all(process.env.API_BASE + "*", (req, res, next) => {
    // Don't check for token if user is logging in
    if (req.path.includes("auth")) return next();

    return auth.authenticate((err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            if (info.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Expired Token, please generate a new one" });
            } else {
                return res.status(401).json({ message: info.message });
            }
        }
        app.set("user", user);
        return next();
    })(req, res, next);
});*/

const recordRouter = container.resolve('recordRouter')
app.use('/records', recordRouter);

const userRouter = container.resolve('userRouter')
app.use('/user', userRouter);

const authRouter = container.resolve('authRouter');
app.use('/auth', authRouter);


module.exports = app;