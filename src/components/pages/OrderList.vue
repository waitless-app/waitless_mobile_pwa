<template>
  <div class="text-white text-xl mb-4">Orders</div>
<div v-for="order in orders" :key="order.id" class="rounded-md bg-gray-700 p-4">
  <div class="font-bold text-white">
    <small class="mr-2">Created:</small><span>{{ order.created}}</span>
  </div>
  <div class="font-bold text-white">
    <small class="mr-2">Status</small><span>{{ order.status}}</span>
  </div>
  <div class="font-bold text-white">
    <small class="mr-2">Premises:</small><span>{{ order.premises }}</span>
  </div>
  <div class="font-bold text-white">
    <small class="mr-2">Products:</small><span v-for="orderProduct in order.order_products" :key="orderProduct.product.name">{{ formatOrderProduct(orderProduct)}}</span>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { OrderService } from '../../services/api.service';

const { data = [] } = await OrderService.query();
const orders = ref(data);

const formatOrderProduct = (orderProduct) => {
  const { product: { name }, quantity } = orderProduct;
  return `${quantity}x ${name}, `;
};
</script>
