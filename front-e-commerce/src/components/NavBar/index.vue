<template>
    <header class="flex justify-between items-center w-full p-6 lg:px-8 bg-white">
        <router-link 
            to="/" 
            class="text-2xl font-bold text-purple-500"
        >
            <img 
                src="@/assets/dev-commerce-logo.png" 
                alt="Logo" 
                class="w-44 inline-block mr-2" 
            />
        </router-link>

        <nav class="w-full flex justify-end items-center" aria-label="Global">
            <div class="flex gap-4 items-center text-md font-semibold leading-6 text-gray-900">
                <router-link to="products" class="hover:text-blue-400">
                    Produtos
                </router-link>
                <div class="border flex items-center border-gray-200 rounded-full p-2 overflow-hidden bg-gray-50">
                    <input type="text" placeholder="Search" class="placeholder:font-thin bg-transparent outline-none h-full font-light" />
                    <Icon icon="tabler:search" class="text-gray-500 cursor-pointer" />
                </div>
                <router-link to="cart">
                    <div class="bg-[#121212] rounded-full h-8 w-8 flex items-center justify-center relative">
                        <Icon icon="tabler:shopping-cart" class="text-white text-[20px]" />
                        <span class="absolute -right-2 -top-1 bg-red-500 text-white text-xs font-light rounded-full w-4 flex items-center justify-center">
                            {{ cart.length ??= 0 }}
                        </span>
                    </div>
                </router-link>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useCart } from '../../composibles/useCart';

const { cart } = useCart();
</script>