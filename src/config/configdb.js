import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

const connectDB = async () =>{
  try{
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }catch(error){
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
export { sequelize };
