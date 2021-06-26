const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const path = require('path');
const logger = require('./loggerConfig/logger')
const { routes } = require('./routeConfig/routes')
const mongoose = require('mongoose');
require('dotenv').config()


class App {
  constructor() {
    this.app = express()
    this.app.use(bodyParser.json());
  }

  async loadRoutingConfigs() {
    try {
      routes.forEach((route) => {
        const [method, endPoint, callback] = route.split(' ')
        const [controllerName, callbackFn] = callback.split('.')
        const controller = require(`./api/controllers/${controllerName}`)
        this.app[method.toLowerCase()](endPoint, controller[callbackFn])
      })
    } catch (e) {
      throw new Error(`Incorrect routing config, with error ${e}`)
    }
  }

  async connectMongoDB() {
    try {
      const connectionString = process.env.DB_HOST
      await mongoose.connect(connectionString, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      logger.log('info', {
        category: 'server log',
        payload: {
          test: 'i am test payload',
          DBhost: process.env.DB_HOST
        }
      });
    } catch(e) {
      throw new Error(`DB connection fail, with error ${e}`)
    }
  }

  async startServer() {
    await this.loadRoutingConfigs()
    await this.connectMongoDB();

    this.app.listen(5000, () => {
      // eslint-disable-next-line no-console
      logger.log('info', {
        category: 'server log',
        payload: {
          test: 'start',
        }
      });
    })
  }
}

const app = new App()
app.startServer()

module.exports = app;