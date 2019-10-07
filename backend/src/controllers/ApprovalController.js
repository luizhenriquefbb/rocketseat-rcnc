/**
* As every controller, the methods we have to put is:
* - index
* - show
* - store
* - update
* - destroy
*/

const Booking = require('../models/Booking')


module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spots');

        // change book status
        booking.approved = true;

        await booking.save();

        // send to user response of the company
        const bookingUserSocket = req.connectedUsers.findByUser_id(booking.user);

        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit("booking_response", booking);
        }

        res.status(200).json(booking);


    },

};