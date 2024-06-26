import { Client } from "pg";
declare global {
  namespace Express {
    interface Request {
      client: Client;
      query: {
        query?: string;
        value?: string;
      };
    }
  }
}
