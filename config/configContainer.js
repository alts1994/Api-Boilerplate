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
const router = express.Router();
const bcrypt= require('bcryptjs');


const container = awilix.createContainer({injectionMode: awilix.InjectionMode.PROXY})
  
container.register({
  // Dependencies
  express: awilix.asValue(express),
  expressRouter: awilix.asValue(router),  
  mongoose: awilix.asValue(mongoose),
  encrypt: awilix.asValue(bcrypt),
  
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

  // Controller
  authController: awilix.asFunction(authController),
  authRouter: awilix.asFunction(authRouter),
})
  
module.exports = container