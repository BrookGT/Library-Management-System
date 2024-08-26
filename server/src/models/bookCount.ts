import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import sequelize from "../config/db";
import Book from "./bookModel";

class BookCount extends Model {
    public book_id!: number;
    public borrow_count!: number;
    book: any;

    public static associate() {
        BookCount.belongsTo(Book, { foreignKey: "book_id", as: "book" });
    }
}

BookCount.init(
    {
        book_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        borrow_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: "book_counts",
        timestamps: false,
    }
);

export default BookCount;
