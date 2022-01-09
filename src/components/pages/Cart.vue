<template>
<div class="fixed z-20 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
    <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

    <!-- This element is to trick the browser into centering the modal contents. -->
<!--    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>-->

    <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
    <div class="flex flex-col bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all h-screen w-full p-4">
      <div class="flex">
        <div @click="toggleCartVisibility" @keyup="toggleCartVisibility">
          <AppIcon class="text-black mt-1" icon="close"/>
        </div>
        <div class="font-medium text-2xl flex-1 text-center">Cart</div>
      </div>
      <div class="flex flex-col mt-5">
          <template v-for="cartProduct in cart" :key="cartProduct.name">
            <ProductCard :name="cartProduct.name" :image="cartProduct.image" theme="light">Quantity: 1</ProductCard>
          </template>
        <template v-if="!cart.length">
           <NotificationCard title="Your cart is empty" />
         </template>
      </div>
      <div class="flex flex-col bg-gray-50 px-4 py-3 mt-auto">
        <div class="flex justify-between my-4">
          <div class="text-xl">Total Price:</div>
          <div class="text-lg text-gray-800 self-end">{{ totalPrice  }} PLN</div>
        </div>
         <AppInput label="Promo Code" type="text" id="promoCode" :disabled="true"/>
        <div>
          <button @click="emit('order:create')" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Order
        </button >
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { defineEmits } from 'vue';
import { useCart } from '../../composable/useCart';
import AppIcon from '@/components/atoms/AppIcon.vue';
import AppInput from '@/components/atoms/AppInput.vue';
import ProductCard from '@/components/organisms/ProductCard.vue';
import NotificationCard from '@/components/organisms/NotificationCard.vue';

const { cart, toggleCartVisibility, totalPrice } = useCart();

const emit = defineEmits(['order:create']);
</script>

<style scoped>

</style>
