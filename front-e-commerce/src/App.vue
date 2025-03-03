<template>
  <div>
    <template v-if="$route.path !== '/checkout'">
      <NavBar />
    </template>
    <div 
      class="flex justify-center mt-2 w-full"
      :class="{ 'mt-0': $route.path === '/checkout' }"
    >
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar/index.vue';
</script>

<style scoped>
</style>
