const Spot = require('../models/Spot');
const User = require('../models/User')

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
            return res.status(400).json({ ok: false, reason: 'req.body is undefined' });
        }

        const { company, value, technologies} = req.body;
        const { user_id } = req.headers;

        // check if user exists
        const user = await User.findById(user_id);
        if (!user){
            return res.status(400).json({ok: false, reason: 'User does not exist' });
        }

        console.clear();
        console.log('user', user);

        // insert in DB
        const parsedTechnologies = technologies.split(",").map(el => el.trim());
        const new_spot = await Spot.create({
            thumbnail : req.file.filename,
            company,
            value : value ? parseFloat(value) : 0,
            technologies : parsedTechnologies,
            user : user_id
        });


        return res.json({ new_spot });
    },


    /**
     * Filter by technology
     * @param {*} req
     * @param {*} res
     */
    async index(req, res) {
        const { tech } = req.query;

        // first, check if spot already exists
        const spot = await Spot.find({ technologies: tech });

        return res.json({ spot });
    },
};
