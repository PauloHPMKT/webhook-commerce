<template>
    <div class="flex items-center mt-0 relative">
        <span class="text-[150px] font-semibold text-gray-100">{{ props.title }}</span>
        <h2 class="text-[36px] font-semibold absolute top-28 before:content-['\_']">
            {{ props.subtitle }}
        </h2>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    subtitle: String
});
</script>