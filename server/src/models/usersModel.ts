import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import sequelize from "../config/db";
import Borrowing from "./borrowing";
import UserActivity from "./userActivity";

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;

    public static associate() {
        User.hasMany(Borrowing, {
            foreignKey: "user_id",
            as: "userBorrowings",
        });
        User.hasOne(UserActivity, {
            foreignKey: "user_id",
            as: "UserActivity",
        });
    }
}

User.init(
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
        tableName: "users",
        timestamps: false,
    }
);

export default User;
