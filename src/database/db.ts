import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  logging: false,
  dialect: "sqlite",
  storage: "./sqlite.db",
});

export default sequelize;
