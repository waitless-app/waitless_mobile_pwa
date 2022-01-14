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
import { ref, watch } from "vue";
import OrderCard from "@/components/organisms/OrderCard.vue";

import { WS_URL } from "@/utils/config";
import { OrderService } from "@/services/order.service";
import { useWebsockets } from "@/composable/useWebsockets";
import { mergeArrayWithObject } from "@/utils/utils";

const { lastMessage } = useWebsockets(WS_URL);

watch(lastMessage, (currentValue) => {
  if (currentValue.type === "order.notification") {
    handleOrderUpdate(currentValue.data);
  }
});

const { data = [] } = await OrderService.query();
const orders = ref(data);

const handleOrderUpdate = (order) => {
  orders.value = mergeArrayWithObject(orders.value, order);
};

const formatOrderProduct = (orderProduct) => {
  const {
    product: { name },
    quantity,
  } = orderProduct;
  return `${quantity}x ${name}, `;
};
</script>
