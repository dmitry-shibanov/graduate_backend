import { Model } from "sequelize";

class Admin extends Model {
    id!: number;
    login!: string;
    name!: string;
    email!: string;
    password!: string;
    key!: string;
}

export default Admin;