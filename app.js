const express = require('express');
const rootRouter = require('./api/routes/rootRouter');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

dotenv.config();

mongoose.connect('mongodb+srv://dbUser:taskmanagertest@cluster0.mctsk.mongodb.net/TASKMANAGER?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }, () =>
            console.log('connected to MongoDB'),
);

app.use(cors());
app.use(express.json());

rootRouter(app);

app.listen(8000, () => console.log('Server up'));
