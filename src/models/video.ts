import { Model } from "sequelize";

class Video extends Model{
    id!: string;
    url!: string;
    time?: number;
    course_id!: number;
    subtitle!: string;
    position!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Video;