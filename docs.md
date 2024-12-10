# Initialize replicaset

Create and setup authKey file properly `sudo chmod 400 mongo/authKey`.
Before every container creation the authKey must be recreated, becouse without it, the docker image throw error with permissions etc. So use previous command.
Start mongodb container `docker compose -f docker-compose.replica-one-db.yml up -d`

There is a problem with creating admin user (check `/docker-entrypoint-replicaset-onedb/init-script.js`)