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

        // search for owner of the spot
        const spotOwner_socket = req.connectedUsers.findByUser_id(new_booking.spot.user);

        if (spotOwner_socket){
            req.io.to(spotOwner_socket).emit("booking_request", new_booking);
        }

        return res.json({
           new_booking
        });
    },

};