import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "baitap03",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Kết nối MySQL thành công!");

    await sequelize.sync({ alter: true });
    console.log("✅ Đồng bộ database thành công!");
  } catch (err) {
    console.error("❌ Lỗi kết nối database:", err.message);
    process.exit(1);
  }
};

export default sequelize;