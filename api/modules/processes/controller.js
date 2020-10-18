const Process = require('../../models/process');
const Task = require('../../models/task');
const { uniqueNamesGenerator, starWars, animals, colors, names } = require('unique-names-generator');

const config = {
    dictionaries: [starWars, animals, colors, names]
}

const taskStatuses = ['running', 'successed', 'failed']

class ProcessesController {
    async getProcesses(req, res) {
        try {
            const processes = await Process.find()
            res.status(200).send(processes);
        } catch (e) {
            res.status(400).send(e);
        }
    }

    async createProcess(req, res) {
        try {
            const name = uniqueNamesGenerator(config);
            const tasksCount = Math.floor(Math.random() * 10)
            const newProcess = new Process({
                name,
                jobsCount: tasksCount
            });
            await newProcess.save()
            for (let i = 0; i < tasksCount; i++){
                const newTask = new Task({
                    processId: newProcess._id,
                    name: uniqueNamesGenerator(config),
                    status: taskStatuses[Math.floor(Math.random() * 3)]
                })
                await newTask.save()
            }
            const processWithTasks = await Process.aggregate([
                {
                    $match: { _id: newProcess._id}
                },
                {
                    $lookup: {
                        from: 'tasks',
                        localField: '_id',
                        foreignField: 'processId',
                        as: 'jobs'
                    }
                }
            ])
            res.send(processWithTasks);
        } catch (e) {
            res.status(400).send(e);
        }
    }

    async getProcessWithJobs(req, res) {
        const id = req.params.id
        const process = await Process.findById(id)
        const processWithTasks = await Process.aggregate([
            {
                $match: { _id: process._id}
            },
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'processId',
                    as: 'jobs'
                }
            }
        ])
        res.send(processWithTasks);
    }

    async removeProcess(req, res) {
        try {
            await Process.deleteOne({_id: req.params.id});
            await Task.deleteMany({processId: req.params.id})
            res.send('Successfully deleted')
        } catch (e) {
            res.status(400).send(e.message)
        }
    }
}

module.exports = ProcessesController;
