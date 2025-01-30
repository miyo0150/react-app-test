const express = require("express");
const { poolConnect, sql } = require("../db");
const bcrypt = require("bcrypt");
const router = express.Router();

//Get all users
router.post("/login", async (req, res) => {

    console.log("🛠️ Debug: Received request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {

        console.error("❌ Missing email or password");
        return res.status(400).send("Email and password are required.");

    }

    await poolConnect;

    const request = new sql.Request();

    try {

        console.log("🛠️ Debug: Checking database for user with email:", email);

        const result = await request
            .input("Email", sql.NVarChar, email)
            .query("SELECT * FROM Users WHERE Email = @Email");

        console.log("🛠️ Debug: Database query result:", result.recordset);

        if (result.recordset.length === 0) {

            console.error("❌ No user found for email:", email);
            return res.status(401).send("Invalid credentials.");

        }

        const user = result.recordset[0];
        console.log("🛠️ Debug: Found user:", user);

        console.log("🛠️ Debug: Comparing passwords...");

        const passwordMatch = await bcrypt.compare(password, user.PASSWORD_HASH);



        if (!passwordMatch) {

            console.error("❌ Incorrect password for:", email);
            return res.status(401).send("Invalid credentials.");

        }

        console.log("✅ Authentication successful for:", email);

        res.json({
            id: user.Id,
            name: user.Name,
            email: user.Email,
            createdAt: user.CREATED_AT,
        });

    } catch (err) {

        console.error("❌ Server error:", err);
        res.status(500).send("Server error.");

    }

});

//Get user by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    await poolConnect;
    const request = new sql.Request();
    try {
        const result = await request
        .input("Id", sql.Int, id)
        .query("SELECT Id, Name, Email, CreatedAt FROM Users WHERE Id = @Id");

        if (result.recordset.length === 0) {
            return res.status(404).send("User not found.");
        }

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;