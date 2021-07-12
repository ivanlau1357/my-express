# node-express-api

This Project is using below technology
 
 1.  node.js
 2.  express
 3.  docker
 4.  mongoDB
 5.  elastic search
 6.  kibana

Installation of this Project:
  
  docker: 
  ```
    1. docker-compose build
    2. docker-compose up
  ```
  
  healthCheck:
  ```
    1. localhost:9200 for elasticsearch
    2. localhost:5601 for kibana
    3. localhost:5000/health for application check
  ```
API Endpoint related:
  
```
  'POST /vedioContentOperation',
  'GET /vedioSearch',
  'GET /vedioContent',
  'GET /vedioContent/:id',
  'GET /vedioRecommendation/:id',
```
PreStart(Please do after healthCheck):

```
  Please use postman to import the data in mongo and elasticSearch with below endpoint
  POST/ locahost:5000/vedioContentOperation --> the data is prepared is resouces folder
```

Testing Step(require using postman):

  For Testing Step 1, 2 are querying in mongoDB
  For Testing Strp 3, 4 are querying in elastic search

  Reason why storing in two platform 
  ```
    1. backfill prepare
    2. Spearate using perpose
        - simple query using mongoDB
        - real-time search/aggregation will done in elastic search
  ```

  1. 'GET /vedioContent' 
  This api will return vedio Content List with Genre & Category
  ```
    GET localhost:5000/vedioContent?genre=Hero
    GET localhost:5000/vedioContent?category=Hero
    GET localhost:5000/vedioContent?category=Hero&genre=Hero
  ```

  2. 'GET /vedioContent/:id(mongo ObjectId)'
  This api will return vedio Content By Id
  ```
    GET localhost:5000/vedioContent/${mongo ObjectId}
  ```

  3. 'GET /vedioSearch'
  This api is for search api which query in elastic search
  ```
    GET localhost:5000/vedioSearch?q=Iron
  ```

  4. 'GET /vedioRecommendation/:id'
  This api will return similar vedio content by pass the elastic search Id
  ```
    GET localhost:5000/vedioRecommendation/${elastic search Id}
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