'use strict';

const expressApp = require('./server/app.js');
const inputModule = require('./utils/input.js');
const loginModule = require('./commands/login.js');
const registerModule = require('./commands/register.js');
const userCommandsModule = require('./commands/userCommands.js');

expressApp.listen(3000, () => {
    console.log('Server Started');
})

console.log(`
This program allows you to create an account or login to an existing account using a CLI. 
All account details are stored in a postgreSQL database. 
This program use a REST API to connect to the database, and allows for the user to request, change or delete their account details.
`);

async function main() {
    const usersChoice = await loginOrRegister();
    if (usersChoice === 'login') {
        try {
            await loginModule.userLogin();
            console.log('Login attempt successful');
        } catch (error) {
            console.error(`Error login attempt failed ${error}`);
            main();
        }
    } else if (usersChoice === 'register') {
        try {
            await registerModule.registerAccount();
            console.log('Account registered successfully');
        } catch (error) {
            console.error(`Error login attempt failed ${error}`);
        }
    }
    userCommands();
    console.log('Thanks for using this program');
}

async function loginOrRegister() {
    console.log(`Do you have an existing account? `);
    const userInput = await inputModule.getUserChoice();
    return userInput;
}

async function userCommands() {
    let anotherCommand = true;
    console.log(`
    While you are logged in you have access to the following commands.
    get - get account details,
    put - update account details, 
    delete - delete account details
    `);
    //Another command will remain true until user no longer wishes to continue adding commands. Controlled by continueRunning function.
    while (anotherCommand) {
        const userCommand = await inputModule.getUserCommand();
        if (userCommand === 'get') {
            await userCommandsModule.getUserInfo();
        } else if (userCommand === 'put') {
            await userCommandsModule.changeUserInfo();
        } else if (userCommand === 'delete') {
            await userCommandsModule.deleteUserInfo();
        }
        continueRunning() === 'true' ? anotherCommand = true: anotherCommand = false;
    };
}

async function continueRunning() {
    const anotherCommand = await inputModule.getUserInput('Do you want to enter another command? y/n ', 'string');
    if (anotherCommand === 'y') {
        return true;
    } else {
        return false;
    }
}

main();