'use strict';
module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile: DataTypes.STRING,
        birthdate: DataTypes.DATEONLY,
        address: {
            type: DataTypes.STRING,
            get: function () {
                return JSON.parse(this.getDataValue('address'));
            },
            set: function (val) {
                return this.setDataValue('address', JSON.stringify(val));
            }
        },
    }, {});
    Employee.associate = function (models) {
        // associations can be defined here
    };
    return Employee;
};