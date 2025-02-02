const express = require("express");
const triggerPipeline = require("../scripts/gitlabPipeline");
require("dotenv").config("./.env");

const router = express.Router();

router.post("/trigger-pipeline", async (req, res) => {
    const { branch, variables } = req.body;

    if (!branch) {
        return res.status(400).json({ error: "Branch name is required!" });
    }

    try {
        const pipelineData = await triggerPipeline(branch, variables);
        res.json({ message: "Pipeline triggered successfully!", pipelineData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;