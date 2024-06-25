import { Client } from "pg";

require("dotenv").config();

const db = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: parseInt(process.env.PORT as string) as number,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
db.connect();

export default db;
