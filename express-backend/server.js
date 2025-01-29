const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const { connectDB } = require("./db");
const passport = require("passport");
const LdapStrategy = require("passport-ldapauth").Strategy;
const ActiveDirectory = require("activedirectory2");
require("dotenv").config({path:"./.env"});

const app = express();
app.use(express.json());
app.use(passport.initialize());

//LDAP Configuration for Authentication
const LDAP_CONFIG = {
    server: {
        url: process.env.LDAP_URL,
        bindDN: process.env.LDAP_BIND_DN,
        bindCredentials: process.env.LDAP_BIND_PASSWORD,
        searchBase: process.env.LDAP_SEARCH_BASE,
        searchFilter: "(sAMAccountName={{username}})",
    },
};

//Active Directory Configuration for Group Checking 
const AD_CONFIG = {
    url: process.env.LDAP_URL,
    baseDN: process.env.LDAP_SEARCH_BASE,
    username: process.env.LDAP_BIND_DN,
    password: process.env.LDAP_BIND_PASSWORD,
};
//Initialize Active Directory connection
const ad = new ActiveDirectory(AD_CONFIG);

//Passport LDAP Strategy
passport.use(new LdapStrategy(LDAP_CONFIG));

//Route: Authenticate User with LDAP
app.post(
    "/api/auth/login",
    passport.authenticate("ldapauth", { session: false}),
    async (req, res) => {
        const user = req.user;
        console.log("Authenticated user:", user);

        //Extract username
        const username = user.sAMAccountName || user.cn;

        try {
            //Fetch user groups from activedirectory
            ad.getGroupMembershipForUser(username, (err, groups) => {
                if (err) {
                    console.error("Error fetching groups:", err);
                    return res.status(500).json({ error: "Error fetching user groups" });
                }
                console.log(` ${username} belongs to groups:`, groups.map(g => g.cn));

                //Define role-based permissions based on groups
                const roles = [];
                if (groups.some(g => g.cn === "IDIT_TEAMX")) roles.push("admin");

                res.json({
                    message: "Authentication successful", 
                    user: {
                        username,
                        email: user.email,
                        displayName: user.displayName,
                        roles,
                    },
                });
            });
        } catch (error) {
            console.error("Error processing user roles:", error);
            res.status(500).json({ error: "Error processing roles" });
        }
    }
);
//Middleware
app.use(bodyParser.json());
app.use(cors());

//User routes
app.use("/api/users", usersRoutes);

async function startServer() {
    await connectDB();
    app.listen(5000, () => console.log("Server running on port 5000"));
}

startServer();
//Server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));