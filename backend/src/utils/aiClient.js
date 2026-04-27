const axios = require('axios');
require('dotenv').config();

const aiClient = axios.create({
    baseURL: process.env.AI_SERVER_URL || 'http://localhost:8000',
    timeout: 30000, // AI xử lý không nên quá 5s
});

module.exports = aiClient;