const express = require('express');
const multer = require('multer');

const uploadConfig = require("./config/upload");

const SectionController = require('./controllers/SectionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = new express.Router();
const upload = multer(uploadConfig)


// hello word
routes.post('/hello_world', (req, res) => {
    return res.json({
        ok: "Hello world",
        body: req.body,
        headers: req.headers
    });
} )

// home page
routes.get("/", SpotController.index);

// Dashboard routes
routes.get("/dashboard", DashboardController.show);

// create new users
routes.post('/new_user/', SectionController.store);

// create new spot
routes.post('/new_spot/', upload.single('thumbnail'), SpotController.store);

// booking a spot
routes.post('/spots/:spot_id/booking', BookingController.store);



module.exports = routes;
