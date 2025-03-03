import { RequestHandler, Request, Response } from "express";

const notificateApprovedPaymentController: RequestHandler = async (req: Request, res: Response) => {
    const { transactions, status } = req.body;
    console.log({
        transactions,
        status
    });

    if (!transactions || !status) {
        res.status(400).json({ message: 'Dados da transação e status são obrigatórios' });
    }
  
    res.json({ message: 'Pagamento registrado com sucessos' });
}

export { notificateApprovedPaymentController };