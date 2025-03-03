<template>
    <div class="mx-auto mt-11 w-[280px] transform overflow-hidden rounded-sm bg-white shadow-md duration-300 hover:shadow-lg">
        <img class="h-48 w-full object-cover object-center" :src="image" alt="Product Image" />
        <div class="p-4">
            <h2 class="mb-2 text-lg font-medium text-gray-900">{{ name }}</h2>
            <p class="mb-2 text-base dark:text-gray-700 text-gray-700">{{ description }}</p>
            <div class="flex items-center">
            <p class="mr-2 flex flex-1 text-lg font-semibold text-gray-900 ">{{ price }}</p>
            <button @click="btn_action" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                <Icon icon="mdi:cart-plus" class="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    id: { type: Number },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String }
});

const emit = defineEmits(['btn_action']);

const btn_action = () => {
    emit('btn_action');
}; 
</script>