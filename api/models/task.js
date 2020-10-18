const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    processId: {
        type: Schema.Types.ObjectID,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['running', 'successed', 'failed'],
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);
