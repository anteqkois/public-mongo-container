import 'dotenv/config';
import { Db, MongoClient } from 'mongodb';

const db_is_srv = false ? '+srv' : ''
const db_auth = true ? `${process.env.DB_USER}:${process.env.DB_PASS}@`:''
const db_name = 'on_chain_data'
const db_host = process.env.DB_HOST

let dbUrl = `mongodb${db_is_srv}://${db_auth}${db_host}/${db_name}?retryWrites=true&w=majority`
console.log('DATABASE URL', dbUrl);

if (process.env.NODE_ENV === 'test') {
  dbUrl += '_test'
}

export const client = new MongoClient(dbUrl, {
  // compressors: 'zstd',
})

export function getDbName(dbUrl: string): string {
  const pathName = new URL(dbUrl).pathname
  return pathName.split('/').reverse()[0]
}

let cdb: Db

export const db = async () => {
  if (cdb) return cdb
  await client.connect()
  cdb = client.db(getDbName(dbUrl))
  return cdb
}