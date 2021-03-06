import { Model, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';


export default class Stream extends Model {
    id!: number;
    name!: string;
    description!: string
    user_id!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}