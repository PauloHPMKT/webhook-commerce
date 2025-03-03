<template>
  <div class="w-full">
    <div class="flex justify-center" v-if="cart.length">
      <div class="flex flex-col">
        <h1 class="font-sans text-xl mb-6 pb-6 border-b-2">My cart</h1>
        <div>
          <div class="w-full pb-6"> 
            <div class="flex items-center border-1 border-blue-600 bg-blue-500 text-white font-semibold rounded-tr-lg rounded-tl-lg h-16 w-full overflow-hidden">
              <div class="w-[600px] border-r-2 border-blue-600 h-full flex items-center pl-4">Product</div>
              <div class="w-[400px] border-r-2 border-blue-600 h-full flex items-center pl-4">Description</div>
              <div class="w-[30%] border-r-2 border-blue-600 h-full flex items-center pl-4">Quantity</div>
              <div class="w-[30%] border-r-2 border-blue-600 h-full flex items-center pl-4">Price</div>
              <div class="w-[30%] h-full flex items-center pl-4">Total</div>
            </div>
            <div 
              v-for="product in cart" :key="product.id" 
              class="flex w-full h-28 border-2" 
              :class="cart.length > 1 ? 'border-t-0' : 'border-y-2'"
            >
              <div class="w-[600px] border-r-2 h-full flex items-center gap-2 pl-4">
                <div class="w-24">
                  <img :src="product.image" :alt="product.name" class="w-full" />
                </div>
                <div class="w-[52%] flex items-center">
                  <p class="font-bold">{{ product.name }}</p>
                </div>
                <div 
                  class="bg-[#121212] rounded-full h-8 w-8 flex items-center justify-center cursor-pointer hover:bg-red-500 transition-all duration-300" 
                  @click="removeProduct(product.id)"
                >
                  <Icon 
                    :tite="`Remove ${product.name} from cart`"
                    icon="tabler:shopping-cart-x" class="text-white text-[20px] hover:text-white transition-all duration-300" 
                  />
                </div>
              </div>
              <div class="w-[400px] border-r-2 h-full flex items-center pl-4">
                {{ product.description }}
              </div>
              <div class="w-[30%] border-r-2 h-full flex justify-center items-center pl-4">
                <button class="mr-2 p-2 rounded-full bg-[#121212] ">
                  <Icon icon="tabler:minus" class="text-white text-[16px]" />
                </button>
                <input 
                  type="text" 
                  class="w-16 h-8 text-center outline-none border-b-2" 
                  v-model="cart.length"
                  @change="sumTotal"
                />
                <button class="ml-2 p-2 rounded-full bg-[#121212] " @click="sumTotal">
                  <Icon icon="tabler:plus" class="text-white text-[16px]" />
                </button>
              </div>
              <div class="w-[30%] border-r-2 h-full flex items-center pl-4">
                {{ product.price }}
              </div>
              <div class="w-[30%] h-full flex items-center pl-4">{{ 'R$ ' + total.toFixed(2).replace('.', ',') }}</div>
            </div>
            <div class="flex w-full mt-6">
              <div class="w-1/2 h-16 flex gap-2">
                <button class="bg-blue-400 hover:bg-blue-600 text-white font-semibold h-12 px-4 rounded cursor-pointer">
                  <router-link to="/checkout">
                    Update cart
                  </router-link>
                </button>
                <button class="bg-blue-400 hover:bg-blue-600 text-white font-semibold h-12 px-4 rounded cursor-pointer">
                  <router-link to="/checkout">
                    Continue shopping
                  </router-link>
                </button>
                <button 
                  @click="removeProducts"
                  class="bg-blue-400 hover:bg-blue-600 text-white font-semibold h-12 px-4 rounded cursor-pointer"
                >
                  Clear cart
                </button>
              </div>
              <div class="w-1/2 flex justify-between items-center mt-6">
                <h1 class="font-bold">R$ {{ total.toFixed(2).replace('.', ',') }}</h1>
                <!-- <div>
                  <button class="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer">
                    <router-link to="/checkout" >
                      Finalizar compra
                    </router-link>
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-96 flex items-center justify-center" v-else>
      <div class="text-center">
        <div class="flex flex-col items-center mb-6">
          <img :src="emptyCart" alt="empty cart" class="w-48" />
          <h2 class="text-2xl font-semibold">Your cart is empty</h2>
          <p class="text-gray-500"> 
            You can add products to your cart by going to the products page
          </p>
        </div>
        <button>
          <router-link to="/products" class="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer">
            Go to products
          </router-link>  
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useCart } from '../composibles/useCart';
import emptyCart from '@/assets/empty.webp';

const { cart, removeProduct, removeProducts, total, sumTotal } = useCart();

onMounted(() => {
  sumTotal();
})
</script>