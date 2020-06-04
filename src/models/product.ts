import { Model } from "sequelize";

class Product extends Model{
    id!: string;
    title!: string;
    content!: string;
    price!: string;
    discount?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Product;