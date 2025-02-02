const axios = require("axios");
require("dotenv").config({path:"./.env"});

const GITLAB_API_URL = process.env.GITLAB_API_URL;
const GITLAB_PROJECT_ID = process.env.GITLAB_PROJECT_ID;
const GITLAB_TRIGGER_TOKEN = process.env.GITLAB_TRIGGER_TOKEN;

const triggerPipeline = async (ref, variables = {}) => {
    try {
        const response = await axios.post(
            `${GITLAB_API_URL}/${GITLAB_PROJECT_ID}/trigger/pipeline`,
            new URLSearchParams({
                token: GITLAB_TRIGGER_TOKEN,
                ref: ref,
                ...Object.fromEntries(
                    Object.entries(variables).map(([key, value]) => [`variables[${key}]`, value])
                ),
            }),
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error triggering GitLab pipeline:", error.response?.data || error.message);
        throw new Error("Failed to trigger pipeline");
    }
};

module.exports = triggerPipeline;