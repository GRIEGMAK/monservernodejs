const sequelize = require('./../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    username: {type: DataTypes.STRING, required: true, unique: true},
    password: {type: DataTypes.STRING, required: true},
    roles: [{type: DataTypes.STRING, ref:'Role'}]
})

module.exports = model('User', User)