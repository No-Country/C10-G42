import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const DB_URL = process.env.DB_URL as string;
export const SECRET = process.env.SECRET as string;