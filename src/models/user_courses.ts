import { Model, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';
import Blog from './blog';
import Basket from './basket';
import Order from './order';

export default class UserCourses extends Model {
    id!: number;
    id_course!:number;
    id_user!:number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
