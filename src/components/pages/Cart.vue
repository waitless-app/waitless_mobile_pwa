<template>
  <AppModal title="Cart" @close="toggleCartVisibility">
    <div class="flex flex-col mt-5">
      <template v-for="cartProduct in cart" :key="cartProduct.name">
        <ProductCard :name="cartProduct.name" :image="cartProduct.image" theme="light"
          >Quantity: 1</ProductCard
        >
      </template>
      <template v-if="!cart.length">
        <NotificationCard title="Your cart is empty" />
      </template>
    </div>
    <div class="flex flex-col bg-gray-50 px-4 py-3 mt-auto">
      <div class="flex justify-between my-4">
        <div class="text-xl">Total Price:</div>
        <div class="text-lg text-gray-800 self-end">{{ totalPrice }} PLN</div>
      </div>
      <AppInput label="Promo Code" type="text" id="promoCode" :disabled="true" />
      <div>
        <button
          @click="emit('order:create')"
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Order
        </button>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { defineEmits } from "vue";
import { useCart } from "../../composable/useCart";
import AppModal from "@/components/organisms/AppModal.vue";
import AppInput from "@/components/atoms/AppInput.vue";
import ProductCard from "@/components/organisms/ProductCard.vue";
import NotificationCard from "@/components/organisms/NotificationCard.vue";

const { cart, toggleCartVisibility, totalPrice } = useCart();

const emit = defineEmits(["order:create"]);
</script>

<style scoped></style>
