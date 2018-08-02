require('dotenv').config();
const express = require('express'),
    cors = require('cors')
const app = express();

// Import routes
var TodoistRouter = require('./routes/todoist');
var SleepAsAndroidRouter = require('./routes/sleepAsAndroid');

app.get('/', (req, res) => res.send('Hello World!'))
app.use(cors())
app.use('/todoist', TodoistRouter)
app.use('/alarm', SleepAsAndroidRouter)

let port = process.env.CLIENT_PORT || 3000;



app.listen(port, () => console.log(`Example app listening on port ${port}!`))