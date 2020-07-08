import { Model, STRING, INTEGER, DATE, BOOLEAN } from "sequelize";
import sequelize from "../db_connection"
import Course from "../../models/course";

Course.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: STRING,
        primaryKey: false,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: false,
        primaryKey: false
    },
}, { sequelize,
    tableName: 'course',
});


export default Course;