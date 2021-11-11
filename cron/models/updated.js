const Sequelize = require('sequelize');
const db = require('../utils/database');

const Artist = require('./artist');

const Updated = db.define(
    'updated',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        followers: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
    },
);

Updated.belongsTo(Artist, {
    onDelete: 'cascade',
    foreignKey: {
        field: 'artistId',
        allowNull: false,
    },
});

module.exports = Updated;
