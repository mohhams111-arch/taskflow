const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./taskflow.db', (err) => {
    if (err) {
        console.log('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'pending',
            priority TEXT DEFAULT 'medium',
            dueDate TEXT,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

module.exports = db;