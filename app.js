const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const path = require('path');
const logger = require('./loggerConfig/logger')
const { routes } = require('./routeConfig/routes')
const { Client } = require('@elastic/elasticsearch')
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

  getElasticSearchClient() {
    const elasticSearchHost = 'http://localhost:9200';
    const esClient = new Client({ node: elasticSearchHost })
    global.EsClient = esClient
  }

  async startServer() {
    await this.loadRoutingConfigs()
    await this.connectMongoDB();
    this.getElasticSearchClient();

    this.app.listen(5000, () => {
      // eslint-disable-next-line no-console
      logger.log('info', {
        category: 'server log',
        payload: {
          test: 'start',
        }
      });
    })

    this.app.use((req, res, next) => {
      if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accepy, Authorization")
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH', 'DELETE', 'GET', 'OPTIONS')
        return res.status(200).send({});
      }
    });
  }
}

const app = new App()
app.startServer()

module.exports = app;