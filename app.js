const express = require('express')
const router = express.Router()
const path = require('path');
const logger = require('./loggerConfig/logger')
const { routes } = require('./routeConfig/routes')
require('dotenv').config()


class App {
  constructor() {
    this.app = express()
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

  async startServer() {
    await this.loadRoutingConfigs()

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