const inputModule = require('../utils/input.js');
const axios = require('axios');

const apiUrl = 'http://localhost:3000';

async function registerAccount() {
    const newAccount = {
        username : inputModule.getUserInput('Enter your username'),
        password : inputModule.getUserInput('Enter your password'),
        firstName : inputModule.getUserInput('Enter your first name'),
        lastName : inputModule.getUserInput('Enter your last name'),
        age : inputModule.getUserInput('Enter your age')
    }
    try {
        await axios.put(`${apiUrl}/api/register`, newAccount);
    } catch (error) {
        console.log(`Error calling register API endpoint ${error}`);
        throw error;
    }
}

module.exports = {
    registerAccount
}