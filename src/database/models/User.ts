import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class User extends Model {
  public id!: number;
  public lang!: "uz" | "ru" | "en";
  public phone!: string;

  public employeeID!: number | null;
  public jobTitle!: string | null;
  public employeeName!: {
    first: string;
    last: string;
    middle: string;
  } | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    lang: {
      type: DataTypes.ENUM("uz", "ru", "en"),
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    employeeID: {
      type: DataTypes.INTEGER,
    },
    jobTitle: {
      type: DataTypes.STRING,
    },
    employeeName: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
  }
);

export default User;
