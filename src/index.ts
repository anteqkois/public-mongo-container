import "dotenv/config";
import { db } from "./mongodb";

export const main = async () => {
  const mongo = await db();

  // console.log(await mongo.collection("btc_price").findOne({}));
  const stream = mongo.collection("btc_price").watch();
  stream.on("change", (change) => {
    console.dir(change, { depth: null });
  });
};

main().then().catch(console.error);
