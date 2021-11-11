const Sequelize = require('sequelize');
const db = require('../utils/database');

const Artist = db.define(
    'artist',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        spotifyId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        freezeTableName: true,
    },
);

module.exports = Artist;
