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