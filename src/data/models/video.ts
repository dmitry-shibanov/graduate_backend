import { Model, STRING, INTEGER, DATE, BOOLEAN } from "sequelize";
import sequelize from "../db_connection"
import Video from "../../models/video";

Video.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    url: {
        type: STRING,
        primaryKey: false,
        allowNull: false
    },
    time: {
        type: INTEGER,
        allowNull: true,
        primaryKey: false
    },
    subtitle: {
        type: STRING,
        allowNull: false,
        primaryKey: false
    },
    position: {
        type: INTEGER,
        primaryKey: false,
        allowNull: false
    },
    course_id: {
        type: INTEGER,
        primaryKey: false,
        allowNull: false
    }
}, { sequelize,
    tableName: 'video',
});

export default Video;