import { Model, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';


export default class Stream extends Model {
    id!: number;
    name!: string;
    description!: string

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}