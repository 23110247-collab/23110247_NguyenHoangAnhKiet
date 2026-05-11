import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';

const PasswordReset = sequelize.define(
  "PasswordReset",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(150), allowNull: false },
    otp: { type: DataTypes.STRING(6), allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
    used: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { tableName: "password_resets", timestamps: true, underscored: true }
);

export default PasswordReset;