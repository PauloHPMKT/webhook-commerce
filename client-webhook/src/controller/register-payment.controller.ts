import { RequestHandler, Request, Response } from "express";
import { savePayment } from "../services/save-payments";

const registerPaymentController: RequestHandler = (req: Request, res: Response): void => {
    const { transactions, status } = req.body;
    console.log({
        transactions,
        status
    });

    if (!transactions || !status) {
        res.status(400).json({ message: 'Dados da transação e status são obrigatórios' });
    }
  
    const newPayment = savePayment({ transactions, status });

    res.json({ message: "Pagamento registrado com sucesso", payment: newPayment });
}

export { registerPaymentController };