/**
* As every controller, the methods we have to put is:
* - index
* - show
* - store
* - update
* - destroy
*/


const Booking = require("../models/Booking");


module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const new_booking = await Booking.create({
            date,
            user : user_id,
            spot: spot_id
        });

        await new_booking.populate('user').populate('spot').execPopulate();

        return res.json({
           new_booking
        });
    },

    async index(req, res) {
        return res.status(400).json({ ok: false, reason: 'in development' });
    },
};