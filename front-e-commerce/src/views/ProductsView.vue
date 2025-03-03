<template>
  <div>
    <h1 class="font-sans text-xl text-center mb-6">Lista de produtos</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      <ProductCard 
        v-for="product in products" 
        :key="product.id"
        v-bind="product"
        @btn_action="addProduct(product)"
      />
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../composibles/useCart';
import ProductCard from '../components/ProductCard/index.vue';

const { products, addProduct } = useCart();
</script>
