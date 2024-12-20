Commands to create local mongo replica set (in PROD databases should be placed on different servers)

## Run with MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD
or add admin when database is running without authentication mode on
```
use admin

db.createUser({
    user: "admin",
     pwd: "password",
    roles:["root"]
 })
```

## Connect to main db container
```
docker exec -it mongodb bash
```

## Login as a admin
```
mongo --host mongodb:27017 -u admin -p <password> --authenticationDatabase admin
```

## Check replica set status
`rs.status()`
`rs.conf()`

## Setup replica set config (add secondary database)
```
config = {
      "_id" : "rsMain",
      "members" : [
        {
          "_id" : 0,
          "host" : "mongodb:27017"
        },
        {
          "_id" : 1,
          "host" : "mongodb2:27017"
        },
      ]
      };
```

## Initialize cluster
```
rs.initiate(config);
```

How to connect:

You must use `directConnection=true` connection option (only for test purpose)
```
mongodb://user:password@mongodb:27017/on_chain_data?replicaSet=rs0&authSource=on_chain_data&directConnection=true
```

Properly connection string
```
mongodb://user:password@<host>:27017/on_chain_data?replicaSet=rs0&authSource=on_chain_data
```

### Additional warnings
When i try to initialize databse using docker compose, the `.js` scirpt isn't run. No solution found.
So i throw away idea to use
```
volumes:
  - ./docker-entrypoint-replicaset-onedb:/docker-entrypoint-initdb.d
```

and back to use simple env veriables and then manually enter to docker container and run the scripts to initialize replica set etc.

# Helpfull docker compose config from other service
```
  mongodb:
    image: mongo:5.0.5
    container_name: mongodb
    # environment:
    #   MONGO_INITDB_ROOT_PASSWORD: <pass>
    #   MONGO_INITDB_ROOT_USERNAME: admin
    ports:
      - 27017:27017
    entrypoint:
      - bash
      - -c
      - |
          chmod 400 /etc/mongo/authKey
          chown 999:999 /etc/mongo/authKey
          exec docker-entrypoint.sh "$@"
    command: ["mongod", "--config", "/etc/mongo/mongod.conf", "--replSet", "rs0"]
    logging:
      driver: "json-file"
      options:
        max-size: 100m
        max-file: "3"
    volumes:
      - ./raw_db:/data/db
      - ./mongo_conf:/etc/mongo
    restart: unless-stopped
```