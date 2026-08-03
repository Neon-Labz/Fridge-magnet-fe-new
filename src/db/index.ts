import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is required");
}

const globalForMongoose = globalThis as typeof globalThis & {
  _mongooseConn?: typeof mongoose;
  _mongoosePromise?: Promise<typeof mongoose>;
};

let cached = globalForMongoose._mongoosePromise;

if (!cached) {
  cached = globalForMongoose._mongoosePromise = mongoose.connect(MONGODB_URI);
}

export const dbConnect = () => cached!;

export default dbConnect;
