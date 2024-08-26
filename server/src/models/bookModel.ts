import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import sequelize from "../config/db";
import BookCount from "./bookCount";
import Borrowing from "./borrowing";

class Book extends Model {
    public id!: number;
    public title!: string;
    public author!: string;
    public description!: string;
    public image_url!: string;

    public static associate() {
        Book.hasOne(BookCount, { foreignKey: "book_id", as: "bookCount" });
        Book.hasMany(Borrowing, {
            foreignKey: "book_id",
            as: "bookBorrowings",
        });
    }
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image_url: {
            type: DataTypes.STRING(255),
        },
    },
    {
        sequelize,
        tableName: "books",
        timestamps: false,
    }
);

export default Book;
