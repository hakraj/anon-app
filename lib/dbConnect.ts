import mongoose from 'mongoose'

const MONGODB_URI: string | undefined = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// let cached = (global as any).mongoose

// if (!cached) {
//     cached = (global as any).mongoose = { conn: null, promise: null }
// }

async function dbConnect() {

    const options = {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    };

    const prom = await mongoose.connect(MONGODB_URI as string, options).then((mongoose) => { mongoose });

    return prom;

    // if (cached.conn) {
    //     return cached.conn
    // }

    // if (!cached.promise) {
    //     const opts = {
    //         bufferCommands: false,
    //     }

    //     cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
    //         return mongoose
    //     })
    // }

    // try {
    //     cached.conn = await cached.promise
    // } catch (e) {
    //     cached.promise = null
    //     throw e
    // }

    // return cached.conn
}

export default dbConnect