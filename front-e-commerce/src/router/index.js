import { createRouter, createWebHistory } from 'vue-router'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/PaymentView.vue') 
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue') 
    }
  ]
})

export default router
