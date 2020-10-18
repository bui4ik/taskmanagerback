const mongoose = require('mongoose');

const processSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    jobsCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Process', processSchema);
