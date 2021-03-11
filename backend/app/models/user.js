'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        nama: DataTypes.STRING,
        no_hp: DataTypes.STRING,
        email: DataTypes.STRING,
        alamat: {
            type: DataTypes.STRING,
            get: function () {
                return JSON.parse(this.getDataValue('alamat'));
            },
            set: function (val) {
                return this.setDataValue('alamat', JSON.stringify(val));
            }
        },
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};