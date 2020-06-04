import Basket from "../../models/basket";
import sequelize from "../db_connection";
import { INTEGER } from "sequelize";

Basket.init({
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: INTEGER
    },
    userId: {
        allowNull: false,
        type: INTEGER
    }
}, { sequelize, tableName: "basket" });

export default Basket;