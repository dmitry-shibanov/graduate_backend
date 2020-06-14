import { Model, STRING, INTEGER, DATE } from "sequelize";
import sequelize from "../db_connection"
import User from "../../models/user";

User.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: STRING,
        primaryKey: false,
        allowNull: true
    },
    email: {
        type: STRING,
        allowNull: false,
        primaryKey: false
    },
    login: {
        type: STRING,
        allowNull: false,
        primaryKey: false
    },
    password: {
        type: STRING,
        primaryKey: false,
        allowNull: false
    },
    resetToken: {
        type: STRING,
        allowNull: true,
        primaryKey: false
    },
    resetDate: {
        type: INTEGER,
        allowNull: true,
        primaryKey: false
    }
}, { sequelize,
    tableName: 'users',
});


export default User;