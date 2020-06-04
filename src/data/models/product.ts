import { Model, STRING, INTEGER, DOUBLE } from 'sequelize'
import sequelize from "../db_connection";
import Product from "../../models/product"

Product.init({
    id:{
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: STRING,
        allowNull: false,
        primaryKey: false
    },
    content: {
        type: STRING,
        allowNull: false,
        primaryKey: false
    },
    price: {
        type: DOUBLE,
        allowNull: false,
    },
    discount: {
        type: INTEGER,
        allowNull: false,
    }
},{sequelize, tableName: "products"});

export default Product;