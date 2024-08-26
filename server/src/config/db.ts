import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    "librarymanagementsystem",
    "postgres",
    "root123",
    {
        host: "localhost",
        dialect: "postgres",
        logging: false,
    }
);

export default sequelize;
