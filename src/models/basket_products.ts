import { Model } from "sequelize";
import Product from "./product";

class BasketProduct extends Model {
    basketId!:number;
    productId!: Product;
    count!:number;

    public readonly createdAt!: Date;
    public readonly updaßtedAt!: Date;
}

export default BasketProduct;