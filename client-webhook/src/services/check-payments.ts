import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, "../../database/payments.json");

export const loadPayments = () => {
    if (!fs.existsSync(DB_FILE)) return [];
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
};