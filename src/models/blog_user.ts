import { Model, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from "sequelize";
import Blog from "./blog";
import User from "./user";

class BlogUser extends Model {
    blogId!: number;
    userId!: number;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getBlogs!: HasManyGetAssociationsMixin<Blog>;
    public addBlog!: HasManyAddAssociationMixin<Blog, number>;
    public hasBlog!: HasManyHasAssociationMixin<Blog, number>;
    public countBlogs!: HasManyCountAssociationsMixin;

    public getUser!: HasManyGetAssociationsMixin<User>;
    public addUser!: HasManyAddAssociationMixin<User, number>;
    public hasUser!: HasManyHasAssociationMixin<User, number>;
    public countUsers!: HasManyCountAssociationsMixin;

    public readonly blogs?: Blog[];
    public static users?: User[];

    public static associations: {
        blogs: Association<BlogUser, Blog>;
        users: Association<BlogUser, User>;
    }
}

export default BlogUser;