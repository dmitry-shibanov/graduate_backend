import { Model, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';
import Blog from './blog';
import Basket from './basket';
import Order from './order';

export default class User extends Model {
    id!: number;
    name?: string;
    email!: string;
    login!: string;
    password!: string;
    resetToken?: string;
    resetDate?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // crud operations for blogs
    public getBlogs!: HasManyGetAssociationsMixin<Blog>;
    public addBlog!: HasManyAddAssociationMixin<Blog, number>;
    public hasBlog!: HasManyHasAssociationMixin<Blog, number>;
    public countBlogs!: HasManyCountAssociationsMixin;
    public createBlog!: HasManyCreateAssociationMixin<Blog>;

    // operations for orders
    public getOrders?: HasManyGetAssociationsMixin<Order>;
    public countOrders?: HasManyCountAssociationsMixin;
    public createOrder!: HasManyCreateAssociationMixin<Order>;
    public addOrder!: HasManyAddAssociationMixin<Order, number>;

    public readonly blogs?: Blog[];

    // Bucket
    public readonly basket?: Basket 

    public readonly orders?: Order[];

    public static associations: {
        blogs: Association<User, Blog>;
        basket: Association<User, Basket>;
        orders: Association<User, Order>;
    };
}
