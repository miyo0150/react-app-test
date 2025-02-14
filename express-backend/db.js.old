const sql = require("mssql");
require("dotenv").config({path:"./.env"});

console.log("DB Config:");
console.log("DB_USER:", process.env.DB_DATABASE, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_USER);
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

let db;

async function connectDB() {
    try {
        if (!db) {
            db = await sql.connect(config);
            console.log("Connted to MSSQL database");
        }
        return db;
    } catch (err) {
        console.error("db connection error:", err);
        process.exit(1);
    }
}


const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on("error", (err) => {
    console.error("SQL Pool Error: ", err);
});

module.exports = {
    connectDB,
    sql,
    poolConnect,
    pool,
};