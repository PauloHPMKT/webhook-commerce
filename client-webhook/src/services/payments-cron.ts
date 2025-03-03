import { CronJob } from "cron";
import axios from "axios";
import { loadPayments } from "./check-payments";
import { savePayments } from "./save-payments";

const WEBHOOK_URL = "http://localhost:3001/notification/approved";

const checkApprovedPayments = async () => {
    console.log("🔄 Verificando pagamentos aprovados...");

    const payments = loadPayments();
    const approvedPayments = payments.filter((payment) => 
        payment.status === "pending"
    );

    for (const payment of approvedPayments) {
        try {
            payment.status = "approved";
            payment.notified = true;
            await axios.post(WEBHOOK_URL, {
                transactionId: payment.transactions[0].id,
                status: payment.status,
                notification: payment.notified,
            });
            console.log(`✅ Webhook enviado para pagamento ID ${payment.transactions[0].id}`);

        } catch (error) {
            console.error(`❌ Erro ao enviar webhook para pagamento ID ${payment.transactions[0].id}:`, error);
        }
    }

    savePayments(payments);
};

// Agendamos a tarefa para rodar a cada 1 minuto
const job = new CronJob("* * * * *", checkApprovedPayments);

export const startCronJobs = () => {
    console.log("⏳ Iniciando cron job de verificação de pagamentos aprovados...");
    job.start();
};