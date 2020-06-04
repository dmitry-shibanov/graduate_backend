import { Model } from "sequelize";

class Message extends Model {
    id!: number;
    content!: string;
    userId!: number;
    blgoId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


}

export default Message;