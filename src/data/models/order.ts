import { INTEGER } from "sequelize";
import sequelize from "../db_connection"
import Order from "../../models/order";

Order.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: INTEGER,
        primaryKey: false,
        allowNull: false
    },
}, { sequelize,
    tableName: 'orders',
});


export default Order;