import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import User from "./User";

class Employee extends Model {
  public id!: number;
  public jobTitle!: string;
  public name!: {
    first: string;
    last: string;
    middle: string;
  };
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.JSON,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: "employees",
    timestamps: true,
  }
);

User.hasOne(Employee, {
  foreignKey: "userId",
  as: "employee",
});

Employee.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Employee;
