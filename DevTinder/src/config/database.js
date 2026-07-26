const dns = require('dns');
const mongoose = require('mongoose');
require('dotenv').config();

// Node on this machine was resolving DNS via 127.0.0.1 (nothing listening),
// which caused: querySrv ECONNREFUSED _mongodb._tcp...
// Force public DNS so mongodb+srv SRV lookups work.
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Never hardcode credentials. Put them in DevTinder/.env (gitignored).
const DB_URL = process.env.MONGODB_URI;

if (!DB_URL) {
  throw new Error(
    'MONGODB_URI is missing. Create DevTinder/.env with MONGODB_URI=mongodb+srv://...'
  );
}

const connectDB = async () => {
  await mongoose.connect(DB_URL);
};

module.exports = connectDB;
