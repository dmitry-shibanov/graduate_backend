import { Model } from "sequelize";

class Order extends Model{
    id!: number;
    userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Order;