const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const LoggedUsers = require("./logged_users");

const consts = require("./config/consts");

// create a server
const app = express();
const server = http.Server(app);
const io = socketio(server)


// connect to mongo atlas
mongoose.connect('mongodb+srv://RCNC_user:RCNC_user@cluster0-qxsir.mongodb.net/rcnc?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

// store logged users
const loggedUsers = new LoggedUsers();

io.on("connection", socket => {
    const { user_id } = socket.handshake.query

    loggedUsers.newUser(user_id, socket.id);

});



// middleware to pass our connected users to the controller
app.use((req, res, next) => {
    req.io = io; // use socket in other routes
    req.connectedUsers = loggedUsers; // use connected users in other routes

    // execute other routes
    return next();
});

// handle cors origin
app.use(cors());

// body must be a json
app.use(express.json());

// reference to upload folders
app.use('/files', express.static(path.resolve(__dirname, "..", "uploads")));

// import routes
app.use(require('./routes'));

server.listen(consts.port);

