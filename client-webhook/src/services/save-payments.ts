import path from "path";
import { writeFileSync } from "fs";
import { loadPayments } from "./check-payments";
import { fileURLToPath } from 'url';

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, "../../database/payments.json");

export const savePayments = (payments: any) => {
    writeFileSync(DB_FILE, JSON.stringify(payments, null, 2));
};

export const savePayment = (payment: any) => {
    const payments = loadPayments();
    const newPayment = payment;
    payments.push(newPayment);
    savePayments(payments);

    return newPayment;
};