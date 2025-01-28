const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const { connectDB } = require("./db");
require("dotenv").config();

const app = express();

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