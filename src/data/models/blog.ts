import {  TEXT, INTEGER } from "sequelize";
import sequelize from "../db_connection"
import Blog from "../../models/blog";

Blog.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: TEXT,
        allowNull: false
    },
    content: {
        type: TEXT,
        allowNull: false
    },
    image: {
        type: TEXT,
        allowNull: true
    }
},{sequelize});

export default Blog;