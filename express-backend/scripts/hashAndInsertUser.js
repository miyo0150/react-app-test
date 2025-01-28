const bcrypt = require("bcrypt");
const sql = require("mssql");

const config = {
    user: "flks_user", //process.env.DB_USER,
    password: "flks_user", //process.env.DB_PASSWORD,
    server: "q10-wd-db1.folknet.intern.folksam.se", //process.env.DB_SERVER,
    database: "emptydatabase", //process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

const addUser = async (name, email, plainTextPassword) => {
    try {
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

        // Connect to the database
        const pool = await sql.connect(config);

        // Insert the user into the database
        const query = `
            INSERT INTO Users (NAME, EMAIL, PASSWORD_HASH)
            VALUES (@Name, @Email, @PasswordHash)
        `;
        const result = await pool
            .request()
            .input("Name", sql.NVarChar, name)
            .input("Email", sql.NVarChar, email)
            .input("PasswordHash", sql.NVarChar, hashedPassword)
            .query(query);

        console.log("User added successfully:", result);
    } catch (err) {
        console.error("Error adding user:", err);
    }
};

// Example Usage
addUser("Mikael Yousif", "mikael.yousif@test.com", "mySecurePassword123");
