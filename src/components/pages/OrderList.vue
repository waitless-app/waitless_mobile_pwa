<template>
  <div class="text-white text-xl mb-4">Orders</div>
  <ul class="flex flex-col mt-4">
    <template v-for="order in orders" :key="order.name">
      <OrderCard
        :image="order.premises.image"
        :name="order.premises.name"
        :status="order.status"
        :description="order.order_products.map((op) => formatOrderProduct(op)).join('')"
        :created="order.created.slice(0, 16)"
      >
        <div class="text-white text-2xl">40 PLN</div>
      </OrderCard>
    </template>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import OrderCard from "@/components/organisms/OrderCard.vue";

import { WS_URL } from "@/utils/config";
import { OrderService } from "@/services/order.service";

// const { COMPLETED, REQUESTED } = OrderStatuses;
const { data = [] } = await OrderService.query();
const orders = ref(data);
// const completedOrders = computed(() => orders.value.filter((order) => order.status === COMPLETED));

// const requestedOrders = computed(() => orders.value.filter((order) => order.status === REQUESTED));

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
