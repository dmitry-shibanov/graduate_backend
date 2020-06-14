import { Model} from "sequelize"

class Blog extends Model{
    id!: number;
    title!: string;
    content!: string
    image?: string;
    userId!: number;
    isPrivate!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

export default Blog;