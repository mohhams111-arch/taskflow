const db = require('../models/database');

const createTask = (task, callback) => {

    const sql = `
        INSERT INTO tasks 
        (title, description, status, priority, dueDate)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            task.title,
            task.description,
            task.status,
            task.priority,
            task.dueDate
        ],
        function(err) {

            if (err) {
                callback(err, null);
            } else {
                callback(null, {
                    id: this.lastID,
                    ...task
                });
            }
        }
    );
};

const getAllTasks = (callback) => {

    const sql = `SELECT * FROM tasks`;

    db.all(sql, [], (err, rows) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

const getTaskById = (id, callback) => {

    const sql = `SELECT * FROM tasks WHERE id = ?`;

    db.get(sql, [id], (err, row) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
};

const updateTask = (id, task, callback) => {

    const sql = `
        UPDATE tasks
        SET title = ?, 
            description = ?, 
            status = ?, 
            priority = ?, 
            dueDate = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [
            task.title,
            task.description,
            task.status,
            task.priority,
            task.dueDate,
            id
        ],
        function(err) {

            if (err) {
                callback(err, null);
            } else {
                callback(null, {
                    updated: this.changes
                });
            }
        }
    );
};

const deleteTask = (id, callback) => {

    const sql = `DELETE FROM tasks WHERE id = ?`;

    db.run(sql, [id], function(err) {

        if (err) {
            callback(err, null);
        } else {
            callback(null, {
                deleted: this.changes
            });
        }
    });
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};