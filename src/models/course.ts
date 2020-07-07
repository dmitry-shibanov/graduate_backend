import { Model, Association, HasManyCountAssociationsMixin, HasManyHasAssociationMixin, HasManyGetAssociationsMixin } from "sequelize";
import Video from "./video";

class Course extends Model{
    id!: number;
    title!: string;
    description!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getVideos!: HasManyGetAssociationsMixin<Video>;
    public hasVide!: HasManyHasAssociationMixin<Video, number>;
    public countVideo!: HasManyCountAssociationsMixin;
    public readonly videos?: Video[];
    public static associations: {
        videos: Association<Course, Video>;
    };
}

export default Course;