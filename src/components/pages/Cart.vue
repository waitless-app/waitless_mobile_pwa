<template>
  <AppModal title="Cart" @close="toggleCartVisibility">
    <div class="flex flex-col mt-5">
      <template v-for="cartItem in cart" :key="cartItem.product.name">
        <ProductCard :name="cartItem.product.name" :image="cartItem.product.image" theme="light"
          ><AppInputCounter v-model="cartItem.quantity" :min="0"></AppInputCounter
        ></ProductCard>
      </template>
      <template v-if="!cart.length">
        <AppNotification title="Your cart is empty" />
      </template>
    </div>
    <div class="flex flex-col bg-gray-50 px-4 py-3 mt-auto">
      <div class="flex justify-between my-4">
        <div class="text-xl">Total Price:</div>
        <div class="text-lg text-gray-800 self-end">{{ totalPrice }} PLN</div>
      </div>
      <AppInput label="Promo Code" type="text" id="promoCode" :disabled="true" />
      <div>
        <AppButton @click="emit('order:create')" class="w-full">
          Order<AppIcon icon="arrowRight" class="ml-2 pb-1"
        /></AppButton>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { defineEmits } from "vue";
import { useCart } from "@/composable/useCart";
import AppModal from "@/components/organisms/AppModal.vue";
import AppIcon from "@/components/atoms/AppIcon.vue";
import AppInput from "@/components/atoms/AppInput.vue";
import AppButton from "@/components/atoms/AppButton.vue";
import ProductCard from "@/components/organisms/ProductCard.vue";
import AppNotification from "@/components/organisms/AppNotification.vue";
import AppInputCounter from "@/components/molecules/AppInputCounter.vue";

const { cart, toggleCartVisibility, totalPrice } = useCart();

const emit = defineEmits(["order:create"]);
</script>
