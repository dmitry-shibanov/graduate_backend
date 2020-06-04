import { Model } from "sequelize";

class BlogMessage extends Model{
    messageId!: number;
    blogId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default BlogMessage;