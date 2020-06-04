import BasketProduct from "../../models/basket_products";
import sequelize from "../db_connection";
import { INTEGER } from "sequelize";

BasketProduct.init({
    basketId: {
        allowNull: false,
        type: INTEGER
    },
    productId: {
        allowNull: true,
        type: INTEGER
    },
    count: {
        allowNull: true,
        type: INTEGER
    }
},{sequelize: sequelize,tableName: "basketproducts"});

export default BasketProduct;