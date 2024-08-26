import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import sequelize from "../config/db";
import User from "./usersModel";
import Book from "./bookModel";

class Borrowing extends Model {
    public id!: number;
    public user_id!: number;
    public book_id!: number;
    public borrow_date!: Date;
    public return_date!: Date;

    public static associate() {
        Borrowing.belongsTo(User, { foreignKey: "user_id", as: "user" });
        Borrowing.belongsTo(Book, { foreignKey: "book_id", as: "book" });
    }
}

Borrowing.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        borrow_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        return_date: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        tableName: "borrowings",
        timestamps: false,
    }
);

export default Borrowing;
