import OrderProduct from "../../models/order_products";
import sequelize from "../db_connection";
import { INTEGER } from "sequelize";

OrderProduct.init({
    orderId: {
        allowNull: false,
        type: INTEGER,
    },
    productsId: {
        allowNull: false,
        type: INTEGER
    },
    count: {
        allowNull: false,
        type: INTEGER,
        defaultValue: 0
    }
},{sequelize:sequelize, tableName: "orderproducts"});

export default OrderProduct;