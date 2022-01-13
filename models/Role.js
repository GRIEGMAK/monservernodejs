const sequelize = require('./../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    password: {type: DataTypes.STRING, required: true},
})

module.exports = model('User', User)