class TasksController {
    async getTasks(req, res) {
        try {
            res.status(200).send([]);
        } catch (e) {
            res.status(400).send(e);
        }
    }
}

module.exports = TasksController;
