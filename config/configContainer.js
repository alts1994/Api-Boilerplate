const awilix = require('awilix');
const recordController = require('../api/v1/record/controller');
const recordModel = require('../api/v1/record/model');
const recordServices = require('../api/v1/record/services');
const recordRouter = require('../api/v1/record/router');

const userController = require('../api/v1/user/controller');
const userModel = require('../api/v1/user/model');
const userServices = require('../api/v1/user/services');
const userRouter = require('../api/v1/user/router');

const authRouter = require('../api/v1/auth/router');
const authController = require('../api/v1/auth/controller');

const mongoose = require('mongoose');
const express = require('express');
const bcrypt= require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

const container = awilix.createContainer({injectionMode: awilix.InjectionMode.PROXY})
  
container.register({
  // Dependencies
  express: awilix.asValue(express),  
  mongoose: awilix.asValue(mongoose),
  encrypt: awilix.asValue(bcrypt),
  passport: awilix.asValue(passport),
  jwt: awilix.asValue(jwt),
  passportJWT: awilix.asValue(passportJWT),
  
  // Record
  recordController: awilix.asFunction(recordController),
  recordServices: awilix.asFunction(recordServices),
  recordModel: awilix.asFunction(recordModel).scoped(),
  recordRouter: awilix.asFunction(recordRouter),

  // User
  userController: awilix.asFunction(userController),
  userServices: awilix.asFunction(userServices),
  userModel: awilix.asFunction(userModel).scoped(),
  userRouter: awilix.asFunction(userRouter),

  // Auth
  authController: awilix.asFunction(authController),
  authRouter: awilix.asFunction(authRouter),
})
  
module.exports = container