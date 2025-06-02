import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Product from '../models/Product.model';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [Product], // ✅ Registro manual
    logging: false,
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export default db;
