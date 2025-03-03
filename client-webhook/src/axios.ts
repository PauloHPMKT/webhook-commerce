import axios from 'axios';

// Simula um pedido sendo criado no e-commerce
const criarPedido = async () => {
    try {
        const response = await axios.post('http://localhost:3001/create-order', {});
        console.log(response.data);
        return response.data.orderId;
    } catch (error) {
        console.error(error);
    }
};

// Simula o provedor de pagamento enviando um webhook após um pagamento aprovado
const enviarWebhookPagamento = async (orderId: string) => {
    console.log('Enviando webhook de pagamento...', orderId);
    try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula tempo de processamento
        const response = await axios.post('http://localhost:3001/webhook/payment', {
            orderId,
            status: 'pago'
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);   
    }
};

const testarFluxo = async () => {
    const orderId = await criarPedido();
    console.log('Pedido criado:', orderId);
    await enviarWebhookPagamento(orderId);
};

testarFluxo();
