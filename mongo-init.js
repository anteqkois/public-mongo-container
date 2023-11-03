use admin
db.createUser({
    user: "yourusername",
    pwd: "yourpassword",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
});