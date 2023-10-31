import { db } from "./mongodb";

export const main = async () => {
  const mongo = await db();
  await mongo.collection("btc_price").insertOne({
    o: 5,
    h: 20,
    l: 3,
    c: 12,
  });

  console.log(await mongo.collection("btc_price").findOne({}));
};

main().then().catch(console.error);
