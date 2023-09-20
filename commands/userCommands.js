const inputModule = require('../utils/input.js');
const registerModule =require('./register.js');
const axios = require('axios');

const apiUrl = 'http://localhost:3000';

async function getUserInfo() {
    const userInfoToChange = inputModule.getUserInfoChoice('Please enter the account info you would like to get');
    try {
        const response = await axios.get(`${apiUrl}/api/get:${userInfoToChange}`);
        console.table(response.data);
    } catch (error) {
        console.error(`Error calling get API endpoint ${error}`);
    }
}

async function changeUserInfo() {
    const userInfoToChange = inputModule.getUserInfoChoice('Please enter the account info you would like to change');
    const updatedAccountInfo = getUpdatedInfo(userInfoToChange);
    try {
        await axios.put(`${apiUrl/api/get}`, updatedAccountInfo);
        console.log(`Account information updated successfully`);
    } catch (error) {
        console.error(`Error calling PUT API endpoint ${error}`);
    }
}

function getUpdatedInfo(userInfoToChange) {
    if (userInfoToChange === 'all') {
        console.log('Enter the information for your updated account');
        return updatedAccountInfo = registerModule.registerAccount();
    } else if (userInfoToChange === 'age') {
        return updatedAccountInfo = inputModule.getUserInput('What is your updated age? ', 'number');
    } else if (userInfoToChange === 'first name' || userInfoToChange === 'last name') {
        return updatedAccountInfo = inputModule.getUserInput(`what is your updated ${userInfoToChange}? `);
    } else {
        return updatedAccountInfo = inputModule.getUserInput(`What is your updated ${userInfoToChange}`);
    }
}

async function deleteUserInfo() {
    const userInfoToChange = inputModule.getUserInfoChoice('Please enter the account info you would like to delete');
    try {
        await axios.delete(`${apiUrl}/api/delete:${userInfoToChange}`);
        console.log('Account information deleted successfully');
    } catch (error) {
        console.error(`Error calling DELETE API endpoint ${error}`);
    }
}

module.exports = {
    getUserInfo,
    changeUserInfo,
    deleteUserInfo
}