import { Model, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin } from "sequelize"
import Product from "../data/models/product";

class Basket extends Model{
    id!: number;
    userId!: number;
    // public readonly products?: Product

    // // crud for basket
    // public getProducts!: HasManyGetAssociationsMixin<Product>;
    // public addProductToBasket!: HasManyAddAssociationMixin<Product, number>;
    // public removeProduct!: HasManyRemoveAssociationMixin<Product, number>;
    // public removeAll!: HasManyRemoveAssociationMixin<Product, number>;

    // public static associations: {
    //     products: Association<Basket, Product>;
    // }
}

export default Basket;