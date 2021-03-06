const mongoose = require('mongoose');

let dbName;
switch (process.env.NODE_ENV) {
    case "test":
        dbName = process.env.testDb || "testdb";
        break;
    case "production":
        dbName = process.env.prodDb || "proddb";
        break;
    default:
        dbName = process.env.devDb ||"devdb";
}

// Assume default mongoDB local port and host if none provided
const dbAddress = process.env.DB_HOST || "127.0.0.1";
const dbPort = process.env.DB_PORT || 27017;

// Check these if mongoose/mongodb deprecation warmings start showing up!
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }

// Use credentials if provided
if (process.env.DB_AUTH === "true") {
    options["user"] = process.env.DB_USER;
    options["pass"] = process.env.DB_PASS;
}

// if no "ECONNREFUSED" in error message something is wrong with db infra
mongoose.connect(`mongodb://${dbAddress}:${dbPort}/${dbName}`, options).catch(err => {
        if (err.message.indexOf("ECONNREFUSED") !== -1) {
            console.error("Error: Server unable to reach MongoDB. Is it running?");
            process.exit(1);
        } else {
            throw err;
        }
    })
    
// If connection successful, acknoledge in console
mongoose.connection.once('open', () => console.log('DB Connection successful'));
