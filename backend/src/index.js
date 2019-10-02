const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// create a server
const app = express();
const server = require('http').Server(app);


// connect to mongo atlas
mongoose.connect('mongodb+srv://RCNC_user:RCNC_user@cluster0-qxsir.mongodb.net/rcnc?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

// middleware to pass our connected users to the controller
app.use((req, res, next) => {
    return next();
});

app.use(cors());

// body must be a json
app.use(express.json());

// reference to upload folders
app.use('/files', express.static(path.resolve(__dirname, "..", "uploads")));

// import routes
app.use(require('./routes'));

server.listen(3333);

