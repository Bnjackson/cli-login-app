const sqlite = require('sqlite3').verbose();
//.verbose enables verbose mode, provides more detailed debugging information and error messages to console.

const db = new sqlite.Database('user_accounts.db');

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT,
        first name TEXT,
        last name TEXT,
        email TEXT
    )
`);


