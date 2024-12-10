import "dotenv/config";
import { Db, MongoClient } from "mongodb";

const db_is_srv = false ? "+srv" : "";
const db_auth = true ? `${process.env.DB_USER}:${process.env.DB_USER_PASS}@` : "";
const db_name = process.env.DB_DATABASE;
const db_host = process.env.DB_PORT ? `${process.env.DB_HOST}:${process.env.DB_PORT}` : process.env.DB_HOST;
const db_params = process.env.DB_PARAMS;

let dbUrl = `mongodb${db_is_srv}://${db_auth}${db_host}${db_params ? `?${db_params}` : ``}`;

if (process.env.NODE_ENV === "test") {
  dbUrl += "_test";
}

export const client = new MongoClient(dbUrl, {
  // compressors: 'zstd',
});

export function getDbName(dbUrl: string): string {
  const pathName = new URL(dbUrl).pathname;
  return pathName.split("/").reverse()[0];
}

let cdb: Db;

export const db = async () => {
  if (cdb) return cdb;
  await client.connect();
	console.log(`Mongodb connected to database`);
  client.on("error", (error) => {
    console.log(`Mongodb connection error`);
    console.log(error);
  });
  // cdb = client.db(getDbName(dbUrl));
  cdb = client.db(db_name);
  return cdb;
};
