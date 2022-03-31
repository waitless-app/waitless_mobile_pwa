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
        <div class="text-white text-2xl">{{ order.total_cost }} PLN</div>
      </OrderCard>
    </template>
    <template v-if="!liveOrders.length">
      <div class="text-white font-bold text-md ml-2">
        There are no active orders. <span role="img" aria-label="think">😕</span>
      </div>
    </template>
  </ul>
  <div
    class="text-white text-xl mt-4 mb-16 cursor-pointer"
    @click="showCompletedOrders = !showCompletedOrders"
    @keyup="showCompletedOrders = !showCompletedOrders"
  >
    Completed Orders <AppIcon :icon="showCompletedOrders ? 'chevronUp' : 'chevronDown'" />
  </div>
  <ul class="flex flex-col mt-4" v-show="showCompletedOrders">
    <template v-for="order in completedOrders" :key="order.name">
      <OrderCard
        :image="order.premises.image"
        :name="order.premises.name"
        :status="order.status"
        :description="order.order_products.map((op) => formatOrderProduct(op)).join('')"
        :created="order.created.slice(0, 16)"
        @click="openOrderDetails(order.id)"
      >
        <div class="text-white text-2xl">{{ order.total_cost }} PLN</div>
      </OrderCard>
    </template>
    <template v-if="!completedOrders.length">
      <div class="text-white font-bold text-md ml-2">
        You don't have completeted orders. <span role="img" aria-label="think">😕</span>
      </div>
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
import AppIcon from "@/components/atoms/AppIcon.vue";

const { lastMessage } = useWebsockets(WS_URL);
const router = useRouter();
const showCompletedOrders = ref(false);

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

const openOrderDetails = (orderId) => {
  router.push({ name: "OrderDetail", params: { orderId } });
};

watch(lastMessage, (currentValue) => {
  if (currentValue.type === "order.notification") {
    handleOrderUpdate(currentValue.data);
  }
});
</script>
