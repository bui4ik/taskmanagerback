const express = require('express');
const router = express.Router();
const ProcessesController = require('./controller');
const processesController = new ProcessesController();

function ProcessesRouter() {
    router.route('/')
        .get(processesController.getProcesses.bind(processesController))
        .post(processesController.createProcess.bind(processesController))
    router.route('/:id')
        .get(processesController.getProcessWithJobs.bind(processesController))
        .delete(processesController.removeProcess.bind(processesController))
    return router;
}

module.exports = ProcessesRouter;
