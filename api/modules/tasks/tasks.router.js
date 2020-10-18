const express = require('express');
const router = express.Router();
const TasksController = require('./controller');
const tasksController = new TasksController();

function TasksRouter() {
    router.route('/').get(tasksController.getTasks.bind(tasksController));
    return router;
}

module.exports = TasksRouter;
