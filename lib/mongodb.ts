import mongoose, { Mongoose } from "mongoose";

// Ensure the MONGODB_URI environment variable is set
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Define the MONGODB_URI environment variable in .env.local"
  );
}

// Cached connection interface to avoid reconnecting on every request in dev
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the Node.js global type to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Reuse the cached connection if it exists, otherwise initialize it
const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

// Persist the cache on the global object so it survives HMR in development
global.mongoose = cached;

/**
 * Connects to MongoDB and returns the Mongoose instance.
 * The connection is cached globally so subsequent calls reuse
 * the same connection instead of opening a new one.
 */
async function connectToDatabase(): Promise<Mongoose> {
  // Return the existing connection immediately if available
  if (cached.conn) return cached.conn;

  // Create a new connection promise if one doesn't exist yet
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      dbName: "jsmasteryprojdb",
      bufferCommands: false,
    });
  }

  // Await the connection and cache the result
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
