import { ref } from "vue";

const products = ref([
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        name: 'Product 1',
        description: 'Alguma descrição sobre o produto',
        price: 'R$ 10,00'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        name: 'Product 2',
        description: 'Alguma descrição sobre o produto',
        price: 'R$ 20,00'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        name: 'Product 3',
        description: 'Alguma descrição sobre o produto',
        price: 'R$ 30,00'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1674296115670-8f0e92b1fddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        name: 'Product 4',
        description: 'Alguma descrição sobre o produto',
        price: 'R$ 40,00'
    }
]);

const cart = ref([]);
const total = ref(0);

export const useCart = () => {

    function addProduct(product) {
        const inCart = cart.value.some(item => item.id === product.id);
        if (!inCart) {
            cart.value.push(product);
        }
        return;
    }

    function removeProduct(id) {
        const index = cart.value.findIndex(item => item.id === id);
        cart.value.splice(index, 1);
        
        
        //decrementar total
        total.value -= Number(products.value.find(item => item.id === id).price
            .replace('R$ ', '')
            .replace(',', '.'));
    }

    function removeProducts() {
        cart.value = [];
        total.value = 0;
    }

    function sumTotal() {
        total.value = cart.value.reduce((acc, item) => {
            return acc + Number(item.price.replace('R$ ', '').replace(',', '.'));
        }, 0);
    }

    return {
        products,
        cart,
        addProduct,
        removeProduct,
        removeProducts,
        total,
        sumTotal,
    }
}