'use strict';
const userRole = require("../constants/userRole");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            adminId:{
                type:Sequelize.INTEGER,
                // allowNull: true,
                // references: {
                //     model: 'Users',
                //     key: 'id'
                // },
            },
            fullName: Sequelize.STRING,
            city: Sequelize.STRING,
            password: Sequelize.STRING,
            phone: Sequelize.STRING,
            nameCompany: Sequelize.STRING,
            doc: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            isChecked:{
                type:Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue:false
            },
            role:{
                type:Sequelize.STRING,
                allowNull: false,
                defaultValue:userRole.agent
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};