<template>
  <div class="text-white text-xl mb-4">Requested Orders</div>
  <div v-for="order in requestedOrders" :key="order.id" class="rounded-md bg-gray-700 p-4">
    <div class="font-bold text-white">
      <small class="mr-2">Created:</small><span>{{ order.created }}</span>
    </div>
    <div class="font-bold text-white">
      <small class="mr-2">Status</small><span>{{ order.status }}</span>
    </div>
    <div class="font-bold text-white">
      <small class="mr-2">Premises:</small><span>{{ order.premises }}</span>
    </div>
    <div class="font-bold text-white">
      <small class="mr-2">Products:</small
      ><span v-for="orderProduct in order.order_products" :key="orderProduct.product.name">{{
        formatOrderProduct(orderProduct)
      }}</span>
    </div>
  </div>
  <div class="text-white text-xl my-4">Completed Orders</div>
  <div v-for="order in completedOrders" :key="order.id" class="rounded-md bg-gray-700 p-4">
    <div class="font-bold text-white">
      <small class="mr-2">Created:</small><span>{{ order.created }}</span>
    </div>
    <div class="font-bold text-white">
      <small class="mr-2">Status</small><span>{{ order.status }}</span>
    </div>
    <div class="font-bold text-white">
      <small class="mr-2">Premises:</small><span>{{ order.premises }}</span>
    </div>
    <div class="font-bold text-white">
      <small class="mr-2">Products:</small
      ><span v-for="orderProduct in order.order_products" :key="orderProduct.product.name">{{
        formatOrderProduct(orderProduct)
      }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import { WS_URL } from "../../utils/config";
import { OrderService, OrderStatuses } from "../../services/order.service";

const { COMPLETED, REQUESTED } = OrderStatuses;
const { data = [] } = await OrderService.query();
const orders = ref(data);

const completedOrders = computed(() => orders.value.filter((order) => order.status === COMPLETED));

const requestedOrders = computed(() => orders.value.filter((order) => order.status === REQUESTED));

const formatOrderProduct = (orderProduct) => {
  const {
    product: { name },
    quantity,
  } = orderProduct;
  return `${quantity}x ${name}, `;
};

// Create WebSocket connection.
const socket = new WebSocket(WS_URL);

// Connection opened
socket.addEventListener("open", () => {
  console.log("Connection Opened");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
</script>
