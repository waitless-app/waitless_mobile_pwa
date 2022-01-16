<template>
  <div class="text-white text-xl mb-4">Live Orders</div>
  <ul class="flex flex-col mt-4">
    <template v-for="order in liveOrders" :key="order.name">
      <OrderCard
        :image="order.premises.image"
        :name="order.premises.name"
        :status="order.status"
        :description="order.order_products.map((op) => formatOrderProduct(op)).join('')"
        :created="order.created.slice(0, 16)"
        @click="openOrderDetails(order.id)"
      >
        <div class="text-white text-2xl">40 PLN</div>
      </OrderCard>
    </template>
  </ul>
  <div class="text-white text-xl my-4">Completed Orders</div>
  <ul class="flex flex-col mt-4">
    <template v-for="order in completedOrders" :key="order.name">
      <OrderCard
        :image="order.premises.image"
        :name="order.premises.name"
        :status="order.status"
        :description="order.order_products.map((op) => formatOrderProduct(op)).join('')"
        :created="order.created.slice(0, 16)"
        @click="openOrderDetails(order.id)"
      >
        <div class="text-white text-2xl">40 PLN</div>
      </OrderCard>
    </template>
  </ul>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
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

const router = useRouter();

const openOrderDetails = (orderId) => {
  router.push({ name: "OrderDetail", params: { orderId } });
};

const { data = [] } = await OrderService.query();
const orders = ref(data);

const completedOrders = computed(() =>
  orders.value.filter((order) => ["COMPLETED", "DECLINED"].includes(order.status))
);

const liveOrders = computed(() =>
  orders.value.filter((order) => ["REQUESTED", "ACCEPTED", "READY"].includes(order.status))
);

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
