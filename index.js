'use strict';

const serverModule = require('./server/app.js');
const inputModule = require('./utils/input.js');
const loginModule = require('./commands/login.js');
const registerModule = require('./commands/register.js');
const userCommandsModule = require('./commands/userCommands.js');

console.log(`
This program allows you to create an account or login to an existing account. 
All account details are stored in a postgreSQL database. 
This program use a REST API to connect to the database, and allows for the user to request, change or delete their account details.
`);

async function main() {
    const usersChoice = await loginOrRegister();
    if (usersChoice === 'login') {
        await loginModule.loginToAccount();
    } else if (usersChoice === 'register') {
        await registerModule.registereNewAccount();
    }
    userCommands();
    console.log('Thanks for using this program');
}

//Function to prompt user to choose between login and register
async function loginOrRegister() {
    console.log(`Do you have an existing account? `);
    const userInput = await inputModule.getUserChoice();
    return userInput;
}

//Function to handle user commands
async function userCommands() {
    let anotherCommand = true;
    console.log(`
    While you are logged in you have access to the following commands.
    get - get account details,
    put - update account details, 
    delete - delete account details,
    These commands will 
    `);
    while (anotherCommand) {
        const userCommand = await inputModule.getUserCommand();
        if (userCommand === 'get') {
            await userCommandsModule.get();
        } else if (userCommand === 'put') {
            await userCommandsModule.put();
        } else if (userCommand === 'delete') {
            await userCommandsModule.delete();
        }
        continueRunning() === 'true' ? anotherCommand = true: anotherCommand = false;
    };
}

//Function to ask the user if they want to continue running commands 
async function continueRunning() {
    const anotherCommand = await inputModule.getUserInput('Do you want to enter another command? y/n ', 'string');
    if (anotherCommand === 'y') {
        return true;
    } else {
        return false;
    }
}

main();