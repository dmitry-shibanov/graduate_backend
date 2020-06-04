import { Sequelize } from 'sequelize';
import creds from "../creds/data.json";

const connection = new Sequelize({username: creds.username, password: creds.password, dialect: "mysql", database: "Shop"});

export default connection;