const axios = require("axios");
const { response } = require("express");
require("dotenv").config({path:"./.env"});

const GITLAB_API_URL = process.env.GITLAB_API_URL;
const GITLAB_PROJECT_ID = process.env.GITLAB_PROJECT_ID;
const GITLAB_TRIGGER_TOKEN = process.env.GITLAB_TRIGGER_TOKEN;

console.log('GITLAB_API_URL:', process.env.GITLAB_API_URL);
console.log('GITLAB_PROJECT_ID:', process.env.GITLAB_PROJECT_ID);
console.log('GITLAB_TRIGGER_TOKEN:', process.env.GITLAB_TRIGGER_TOKEN);

const triggerPipeline = async (ref, variables = {}) => {
    try {
        const response = await axios.post(
            `${GITLAB_API_URL}/projects/${GITLAB_PROJECT_ID}/trigger/pipeline`,
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
        console.log('Response:', response); // Log the entire response
        console.log('Response Data:', response.data); // Log the data part of the response
        return response.data;
    } catch (error) {
        console.error("Error triggering GitLab pipeline:", error.response?.data || error.message);
        throw new Error("Failed to trigger pipeline");
    }
};

module.exports = triggerPipeline;