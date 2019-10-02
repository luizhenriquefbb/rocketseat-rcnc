const User = require('../models/User');


/**
 * As every controller, the methods we have to put is:
 * - index
 * - show
 * - store
 * - update
 * - destroy
 */

module.exports = {
    async store(req, res) {
        if (!req.body) {
            return res.json({ ok: false, reason: 'req.body is undefined' });
        }

        const { email } = req.body;

        // first, check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ new_user: userExists });
        }

        // insert in DB
        const newUser = await User.create({
            email
        });


        return res.json({ new_user: newUser });
    },

    async index(req, res) {
        const userId = req.headers.user;

        // first, check if user already exists
        const user = await User.findById(userId);

        return res.json({ user });
    },
};
