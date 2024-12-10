import "dotenv/config";
import { db } from "./mongodb";

export const main = async () => {
  const mongo = await db();

  const stream = mongo.collection("test").watch();
  stream.on("change", (change) => {
    console.dir(change, { depth: null });
  });
};

main().then().catch(console.error);
