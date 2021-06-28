# node-express-api

This Project is using below technology
 
 1.  node.js
 2.  express
 3.  docker
 4.  mongoDB

To start this project, you can choose to use local or docker

  local: 
  ```
  1. please run npm install before you start the project
  2. run npm start
  3. localhost:5000/health for the health check
  ```
  docker:
  ```
  1. run docker-compose build --no-cache
  2. run docker-compose up

  if you see mongoDB connection error, please check through mongoDB session and restart the container
  ```

  mongoDB:
  ```
  1. After you start the docker, if showing connection error, please use below comment to add user permission to access mongoDB
      docker ps --> find mongo Container ID
      docker exec -it [Container ID] bash
  2. Access mongoDB
      mongo
  3. Plz create user for access mongoDB
      use poll
      db.createUser(
        {
          user: "poll",
          pwd: "poll",
          roles: [ "readWrite", "dbAdmin" ]
        }
      )
      ref: "mongodb://poll:poll@mongo:27017/poll?authSource=poll"
  ```
  HealthCheck:
  ```
    Please check localhost:5000/health 
  ```
  Pre-start:
  ```
    Please use postman to import the data in mongo with below endpoint
    POST/ locahost:5000/pollOperation --> the data is prepared is resouces folder
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