const sql = require("mssql");
require("dotenv").config();

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

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on("error", (err) => {
    console.error("SQL Pool Error: ", err);
});

module.exports = {
    sql,
    poolConnect,
    pool,
};