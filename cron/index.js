require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./utils/database');
const Artist = require('./models/artist');
const Updated = require('./models/updated');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors());

const axios = require('axios');
const cron = require('node-cron');

(async () => {
    try {
        await sequelize.sync({ force: false });
    } catch (error) {
        console.log(error);
    }
})();

cron.schedule('0 5 * * *', () => {
    console.log('running task every day at 05:00 am');

    artists = ['booba', 'jsx', 'sneazzy', 'naps', 'dtf', 'plk'];

    artists.forEach((artistName) => {
        axios
            .get('http://192.168.1.84:9000/me/artist/' + artistName)
            .then((response) => {
                Artist.findOrCreate({
                    where: { name: response.data.items[0].name },
                    defaults: { spotifyId: response.data.items[0].id },
                });

                Artist.findOne({ where: { name: response.data.items[0].name } }).then((artist) => {
                    Updated.create({
                        followers: response.data.items[0].followers.total,
                        artistId: artist.id,
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
