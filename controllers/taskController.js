const taskService = require('../services/taskService');

const createTask = (req, res) => {

    const task = req.body;

    if (!task.title) {
        return res.status(400).json({
            message: 'Title is required'
        });
    }

    taskService.createTask(task, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(201).json(result);
    });
};

const getAllTasks = (req, res) => {

    taskService.getAllTasks((err, tasks) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(200).json(tasks);
    });
};

const getTaskById = (req, res) => {

    const id = req.params.id;

    taskService.getTaskById(id, (err, task) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        res.status(200).json(task);
    });
};

const updateTask = (req, res) => {

    const id = req.params.id;

    const task = req.body;

    taskService.updateTask(id, task, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(200).json(result);
    });
};

const deleteTask = (req, res) => {

    const id = req.params.id;

    taskService.deleteTask(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.status(200).json(result);
    });
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};