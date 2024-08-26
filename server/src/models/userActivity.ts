import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./usersModel";

class UserActivity extends Model {
    public user_id!: number;
    public books_borrowed_count?: number;
    public books_returned_count?: number;
    user: any;

    public static associate() {
        UserActivity.belongsTo(User, {
            foreignKey: "user_id",
            as: "user",
        });
    }
}

UserActivity.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        books_borrowed_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        books_returned_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: "user_activity",
        timestamps: false,
    }
);

export default UserActivity;
