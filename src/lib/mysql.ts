import mysql from "mysql2/promise";

const globalForMysql = globalThis as unknown as {
  mysqlPool?: mysql.Pool;
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getMysqlPool() {
  if (!globalForMysql.mysqlPool) {
    globalForMysql.mysqlPool = mysql.createPool({
      host: requiredEnv("DB_HOST"),
      port: Number(process.env.DB_PORT ?? 3306),
      database: requiredEnv("DB_NAME"),
      user: requiredEnv("DB_USER"),
      password: process.env.DB_PASSWORD ?? "",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      namedPlaceholders: true,
      charset: "utf8mb4",
    });
  }

  return globalForMysql.mysqlPool;
}
