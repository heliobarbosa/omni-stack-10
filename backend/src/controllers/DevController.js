const axios = require('axios')
const Dev = require("../models/Dev");
const parseStringAsArray = require('../utils/parseStringAsArray')


module.exports = {

    async index(req,res){
        const devs = await Dev.find();
        return res.json(devs);
    },
    
    async store(req, res) {
        const { github_username, techs, longitude, latitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            let { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location

            });
        }
        return res.json(dev);
    },

    async update(req, res){

        const { id, techs, longitude, latitude } = req.body;
        let dev = await Dev.updateOne({"_id":id},{ techs,longitude,latitude} );
        dev = await Dev.findOne({_id:id})
        
        //let dev = await Dev.findByIdAndUpdate("5e1e095ca862c226407f3c7e",{bio:'123456'},{lean: true});

        return res.json(dev);
    },


    async destroy(req, res){
        const {id} = req.body;
        let dev = await Dev.findOneAndDelete(id);
        return res.json(dev);
    }
};