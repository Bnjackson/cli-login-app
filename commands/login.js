const inputModule = require('../utils/input.js');
const axios = require('axios');

const apiUrl = 'http://localhost:3000';

async function userLogin() {
    const username = inputModule.getUserInput('Enter your username ');
    const password = inputModule.getUserInput('Enter your password ');
    try {
        await axios.put(`${apiUrl}/api/login`, username, password);
    } catch (error) {
        console.error(`Error calling login API endpoint ${error}`);
        throw error;
    }
}

module.exports = {
    userLogin
}