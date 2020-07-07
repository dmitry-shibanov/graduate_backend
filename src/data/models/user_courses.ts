import { Model, STRING, INTEGER, DATE, BOOLEAN } from "sequelize";
import sequelize from "../db_connection"
import UserCourses from "../../models/user_courses";

UserCourses.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_course: {
        type: INTEGER,
        primaryKey: false,
        allowNull: false
    },
    id_user: {
        type: INTEGER,
        allowNull: false,
        primaryKey: false
    }

}, { sequelize,
    tableName: 'usercourses',
});


export default UserCourses;