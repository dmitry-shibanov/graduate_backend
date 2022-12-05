import { Model } from "sequelize";

class Video extends Model{
    id!: string;
    url!: string;
    id_cource!: number;
    time!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default Video;