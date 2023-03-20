import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host:
    process.env.NODE_ENV === "production"
      ? process.env.POSTGRES_HOST_PROD
      : process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
});

export default pool;
