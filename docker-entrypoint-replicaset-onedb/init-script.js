db = db.getSiblingDB("admin");

// Initialize the replica set
rs.initiate();

// Wait for the replica set to be initialized and ensure we are connected to the primary
while (!rs.isMaster().ismaster) {
  print("Waiting for the replica set to elect a primary...");
  sleep(2000); // Sleep for 2 seconds to give more time
}

// Now create the root user with admin privileges (THIS NOT WORK - I don't know why, container logs show that user was created but I can not use it)
db.createUser({
  user: "root",
  pwd: "example",
  roles: [{ role: "root", db: "admin" }],
});

db = db.getSiblingDB("test");
db.createUser({
  user: "user",
  pwd: "pass",
  roles: [{ role: "readWrite", db: "admin" }, { role: "readWrite", db: "test" }],
});

db.createCollection("test");
print("User created");
