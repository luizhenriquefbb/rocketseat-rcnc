const Spot = require('../models/Spot');

/**
* As every controller, the methods we have to put is:
* - index
* - show
* - store
* - update
* - destroy
*/

module.exports = {

    async show(req, res) {

        const { user_id } = req.headers;

        const spots = await Spot.find({ user: user_id });

        return res.json({ spots });
    },
};

