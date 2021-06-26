# node-express-stock

This Project is using below technology
 
 1.  node.js
 2.  express
 3.  docker

To start this project, you can choose to use local or docker

  local: 
  ```
  1. please run npm install before you start the project
  2. run npm start
  3. localhost:5000/health for the health check
  ```
  docker:
  ```
  1. please run npm install before you start the project
  2. run docker-compose build
  3. run docker-compose -p stock up -d
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