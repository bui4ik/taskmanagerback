const processesRouter = require('../modules/processes/processes.router');
const tasksRouter = require('../modules/tasks/tasks.router');

function rootRouter(app) {
    app.use('/api/processes', processesRouter());
    app.use('/api/tasks', tasksRouter());
}

module.exports = rootRouter;
