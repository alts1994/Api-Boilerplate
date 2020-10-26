const dotenv = require("dotenv").config();
const db = require("./db");
const helmet = require('helmet');
const container = require('./configContainer');
const express = require('express');
const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;

const app = express();

// so we can get the client's IP address
app.enable("trust proxy");

app.use(helmet());
app.use(express.json());


const strategies = container.resolve('strategies');
passport.use("jwt", new jwtStrategy(strategies.jwtOptions, strategies.jwt));

const authJwt = (callback)=> passport.authenticate("jwt",  { session: false, failWithError: true }, callback);

    app.all("*", (req, res, next) => {
    // Don't check for token if user is logging in
    if (req.path.includes("auth")) return next();

    return authJwt((err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            if (info.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Expired Token, generate a new one at /auth/" });
            } else {
                return res.status(401).json({ message: info.message });
            }
        }
        app.set("user", user);
        return next();
    })(req, res, next);
});

const recordRouter = container.resolve('recordRouter')
app.use('/records', recordRouter);

const userRouter = container.resolve('userRouter')
app.use('/user', userRouter);

const authRouter = container.resolve('authRouter');
app.use('/auth', authRouter);


module.exports = app;