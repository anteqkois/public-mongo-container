import "dotenv/config";
import { db } from "./mongodb";

export const main = async () => {
  const mongo = await db();
  await mongo.collection("btc_price").insertMany([
    {
      o: 1,
      h: 1,
      l: 1,
      c: 1,
    },
    {
      o: 2,
      h: 2,
      l: 2,
      c: 2,
    },
    {
      o: 3,
      h: 3,
      l: 3,
      c: 3,
    },
    {
      o: 4,
      h: 4,
      l: 4,
      c: 4,
    },
    {
      o: 5,
      h: 5,
      l: 5,
      c: 5,
    },
    {
      o: 6,
      h: 6,
      l: 6,
      c: 6,
    },
  ]);

  console.log(await mongo.collection("btc_price").findOne({}));
};

main().then().catch(console.error);
