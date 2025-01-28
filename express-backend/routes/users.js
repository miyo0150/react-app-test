const express = require("express");
const { poolConnect, sql } = require("../db");
const bcrypt = require("bcrypt");
const router = express.Router();

//Get all users
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    await poolConnect;
    const request = new sql.Request();
    try {
        //Fetch user by email
        const result = await request
        .input("Email", sql.NVarChar, email)
        .query("SELECT * FROM Users WHERE Email = @Email");

        if (result.recordset.length === 0) {
            return res.status(401).send("Invalid email or password.");
        }

        const user = result.recordset[0];
        const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

        if (!passwordMatch) {
            return res.status(401).send("Invalid email or password.");
        }

        //On successful authentication, send back user data (excluding sensitive fields)
        res.json({
            id: user.Id,
            name: user.Name,
            email: user.Email,
            createdAt: user.CreatedAt,
        });
    } catch (err) {
        res.status(500).send(err.message);
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