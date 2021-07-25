# node-express-api

This Project is using below technology
 
 1.  node.js
 2.  express
 3.  docker
 4.  mongoDB

Installation of this Project:
  
  docker: 
  ```
    1. docker-compose build
    2. docker-compose up
  ```
  
  healthCheck:
  ```
    1. localhost:5000/health for application check
  ```
API Endpoint related:
  
```
  'POST /wallet/deposit',s
  'POST /wallet/withdraw',
  'POST /wallet/sendMoney',
  'GET /wallet/:id/balance',
  'POST /wallet ',

  doc:
  *walletId(reference Mongo collection id) plz check for 'POST /wallet ' result
```

PreStart (Please do after healthCheck):

```
  Please use postman to import the testing collection api from url
  https://drive.google.com/file/d/1NQ-BvfcdsWUT7jbGEBc9GkppDbChRLhR/view?usp=sharing

  Please using create wall api to create wallet for user
  (Assume create wallet as valid registered users) 
```

Planning for this project:
```
  1. Wallet Apps needs to having login/User concept
  2. Needs to have a compelete log for all transition
  3. How to handle wallet balance? store in collection or real-time calculate?
  4. How to handle platform and currency concept in this Wallet Apps
  5. Needs similar to blockchain, how to apply blockchain concept in the project
```

Decision making:
```
  1. To Be simple, using Wallet Model to represent User has wallet or not in this system
  2. Using WalletTransactionLog Model to store all the transaction record
  3. Handle wallet balance in real-time calculation, avoid db raising condiction
  4. Currently not considering on platform and currency, if needs to consider, will do in Wallet Model
  5. Apply data(transcation), prevHash and currHash in WalletTransactionLog Model
```

Areas to be improved
```
  1. Codeing implementation not very like a reusable libaray coding level
  2. Will having performance issue when WalletTransactionLog Model become scaled
     solution: 
     --> using redis to cache result, when write traffic revoke cache, next read traffic will cache new balance
     --> store banlance in wallet as off-line calculation, daily corn-job to sync with Logs records
  3. Currently with less security concept in this project.
     thinking on:
     --> Adding a login system with JWT token for authentication and authorization 
  4. Needs Unit Test and Integration Test to cover all transactions method(due to time limitation)     
```

HighLight In this project

1. routeConfig/routes.js
```
Centralized all api end point in routes.js
Example for define new api:
[HTTP Method] [endpoint] [target Controller]

The Magic is done in app.js loadRoutingConfigs()
```

2. loggerConfig/logger.js
```
All logging structure will define in here
```

3. asyncConsole.js
```
CLI tools for this application
run yarn asyncConsole
```

4. MVC structure under /api
```
Most Api will follow below structure to complete
[Controller] ---> [Service] ---> [Model]
[View] for json return

Controller: entry for all api endpoint
Service: handle a business Logic
Model: perform model's own CRUD
View: Json
```
