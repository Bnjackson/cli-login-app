const readlineSync = require('readline-sync');

async function getUserInput(question, inputType) {
    let userInput = readlineSync.question(`${question}? `);
    if (inputType === 'number') {
        userInput = Number(userInput);
        return checkNumberInput(userInput) ? userInput : getUserInput(question, inputType);
    } else if (inputType === 'string') {
        userInput = userInput.toLowerCase();
        return checkStringInput(userInput) ? userInput : getUserInput(question, inputType);
    } else {
        return checkUserInput(userInput) ? userInput : getUserInput(question);
    }
}

function checkNumberInput(userInput) {
    if (!isNaN(userInput) && userInput) {
        //Second condition checks for an empty string, which is not caught by isNaN
        return true;
    } else {
        console.log('Error: Input must be a number');
        return false;
    }
} 

function checkStringInput(userInput) {
    const pattern = /[^a-zA-Z]|\s/;
    //Regex checks for numbers, non-letter characters and empty spaces. 
    if (!pattern.test(userInput) && userInput) {
        return true;
    } else {
        console.log('Error: Input must be a string with no numbers');
        return false;
    }
}

async function checkUserInput(userInput) {
    if (userInput) {
        return true;
    } else {
        console.log('Error: Input must not be empty.')
        return false;
    }
}

async function getUserChoice() {
    //User choice refers to whether user wants to login or create a new account.
    const allowedChoices = ['login', 'register'];
    const userChoice = getUserInput('Do you want to login to an existing account, or create a new account? login/register', 'string'); 
    if (allowedChoices.includes(userChoice)) {
        return userChoice
    } else {
        return getUserChoice();
    }
}

async function getUserCommand() {
    const allowedCommands = ['get', 'put', 'delete'];
    const userCommand = getUserInput('Enter command');
    if (allowedCommands.includes(userCommand)) {
        return userCommand;
    } else {
        return getUserCommand();
    }
}

async function getUserInfoChoice(message) {
    //Prompts user for account info choice and returns choice to userCommands functions
    const allowedInputs = ['all', 'username', 'password', 'first name', 'last name', 'age'];
    //All refers to entire user information
    console.log(message);
    const userInput = readlineSync.question(`${allowedInputs} are your choices to input`).toLowerCase();
    return allowedInputs.includes(userInput) ? userInput : getUserInfoChoice(message);
}

module.exports = {
    getUserInput,
    getUserChoice,
    getUserCommand,
    getUserInfoChoice
}