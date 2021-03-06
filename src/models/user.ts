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
    verified!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // crud operations for blogs
    public getBlogs!: HasManyGetAssociationsMixin<Blog>;
    public addBlog!: HasManyAddAssociationMixin<Blog, number>;
    public hasBlog!: HasManyHasAssociationMixin<Blog, number>;
    public countBlogs!: HasManyCountAssociationsMixin;
    public createBlog!: HasManyCreateAssociationMixin<Blog>;

    public readonly blogs?: Blog[];

    public static associations: {
        blogs: Association<User, Blog>;
    };
}
