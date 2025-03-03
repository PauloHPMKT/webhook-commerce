<template>
    <div class="container mx-auto">
        <section class="w-full flex h-[500px] image-bg">
            <div class="w-1/2 flex">
                <div class="font-sans flex justify-center items-center text-white bg-red-500 h-full pl-64 w-full">
                    <div class="filter bg-black bg-opacity-50 p-8">
                        <div class="mb-8 border-b-2 w-fit flex flex-col">
                            <p class="uppercase mb-2 text-[20px] tracking-widest">March 2002</p>
                            <p class="uppercase mb-4 text-[20px] tracking-widest">Nike SB Dunk Low Pro</p>
                        </div>    
                        <h1 class="font-bold tracking-widest text-[76px] mb-6">
                            {{ 'Suba'.toUpperCase() }}
                        </h1>
                        <p class="text-[16px] font-thin tracking-widest">
                            Supa wanted something that was going to rep his East Coast
                            roots and, more specifically, his hometown of New York City is a big way.
                        </p>
                        <button class="mt-8 bg-white text-lg text-black py-4 px-20 rounded-full border-4 font-semibold">
                            Purchase nows
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section class="max-w-[80%] mx-auto mt-2">
            <CustomTitle 
                title="Features" 
                subtitle="Feature products" 
            />
            <div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                    <ProductCard 
                        v-for="product in products" 
                        :key="product.id"
                        v-bind="product"
                        @btn_action="addProduct(product)"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import CustomTitle from '@/components/CustomTitle/index.vue';
import ProductCard from '../components/ProductCard/index.vue';
import { useCart } from '../composibles/useCart';

const { products, addProduct } = useCart();
</script>

<style scoped>
.image-bg {
    background-image: url('../assets/banner.webp');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top right;
}
</style>