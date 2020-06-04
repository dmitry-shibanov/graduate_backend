import { Model } from "sequelize";
import Product from "./product";

class OrderProduct extends Model {
    orderId!:number;
    productsId!: Product;
    count!:number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default OrderProduct;