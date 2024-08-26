import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import sequelize from "../config/db";

class Admin extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "admins",
        timestamps: false,
    }
);

export default Admin;
