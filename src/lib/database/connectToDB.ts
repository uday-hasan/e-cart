import mongoose, { Mongoose } from "mongoose";

interface Cache {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cache: Cache = (global as any).mongoose;

if (!cache) {
  cache = (global as any).mongoose = { connection: null, promise: null };
}
const URL = process.env.MONGO_URL;

export const connectToDB = async () => {
  try {
    if (cache.connection) {
      return cache.connection;
    }

    cache.promise =
      cache.promise || mongoose.connect(URL!, { dbName: "Drone Factory" });

    cache.connection = await cache.promise;
    return cache.connection;
  } catch (error) {
    console.log({ error });
  }
};
