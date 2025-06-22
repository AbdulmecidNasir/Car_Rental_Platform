import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Veritabanı bağlantı ayarları
export const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  port: parseInt(process.env.DB_PORT, 10)
};

// Veritabanı bağlantı fonksiyonu
export async function connectDB() {
  try {
    const pool = await new sql.ConnectionPool(config).connect();
    console.log('Connected to MSSQL database');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err; // Hatayı yukarı fırlat
  }
}

// SQL modülünü export et
export { sql };