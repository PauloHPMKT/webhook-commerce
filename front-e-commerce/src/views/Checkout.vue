<template>
    <div class="flex w-[70%] h-screen">
        <div class="w-1/2 pr-14 pt-8">
            <img :src="logoDevCommerce" alt="logo DevCommerce" class="w-48" />
            Checkout
        </div>
        <div class="w-1/2 border-l-[1px] pl-14  pt-8">
            <h3 class="mb-6">Informações da compra</h3>
            <form @submit.prevent="alert('clicou')">
                <div>
                    <label for="email" class="text-gray-500">E-mail</label>
                    <input 
                        type="email" 
                        id="email" 
                        class="w-full p-2 border border-gray-300 rounded" 
                    />
                </div>
                <div class="mt-6">
                    <span>Endereço da compra</span>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Nome"
                            class="w-full p-2 border border-gray-300 rounded-tl rounded-tr" 
                        />
                        <input 
                            type="text" 
                            placeholder="País"
                            class="w-full p-2 border border-gray-300" 
                        />
                        <input 
                            type="text" 
                            placeholder="Endereço ou CEP"
                            class="w-full p-2 border border-gray-300 rounded-bl rounded-br" 
                        />
                    </div>
                </div>
                <div class="mt-12">
                    <h3>Detalhes do Pagamento</h3>
                    <div>
                        <label for="card" class="text-gray-500">Número do cartão</label>
                        <input 
                            type="text" 
                            id="card" 
                            placeholder="1234 1234 1234 1234"
                            class="w-full p-2 border border-gray-300 rounded-tl rounded-tr" 
                        />
                        <div class="flex">
                            <input 
                                type="text" 
                                id="card" 
                                placeholder="MM/YY"
                                class="w-full p-2 border border-gray-300 rounded-bl" 
                            />
                            <input 
                                type="text" 
                                id="card" 
                                placeholder="CVV"
                                class="w-full p-2 border border-gray-300 rounded-br" 
                            />
                        </div>
                    </div>
                </div>
                <button class="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer mt-6 w-full">
                    Finalizar compra total: R$ 
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import logoDevCommerce from '@/assets/dev-commerce-logo.png';
</script>