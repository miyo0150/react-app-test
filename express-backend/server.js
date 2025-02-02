const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const gitlabPipeline = require("./routes/triggerGitLab");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true })); //CORS (Allows authentication only from frontend URL)

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/scripts", gitlabPipeline);

async function startServer() {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();
