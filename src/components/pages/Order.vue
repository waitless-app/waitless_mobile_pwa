<template>
  <div class="text-white text-2xl mb-4">Collect Order</div>
  <div class="flex flex-col">
    <div class="border-gray-400 flex flex-row mb-2">
      <div
        class="select-none cursor-pointer rounded-md flex flex-1 justify-between items-center p-4 bg-gray-700"
      >
        <div>
          <div class="text-white">{{ order.premises.name }}</div>
          <div class="ml-4 text-gray-500">{{ order.id.slice(0, 4) }}</div>
        </div>
        <div>
          <div>{{ order.status }}</div>
        </div>
      </div>
    </div>
    <div class="flex justify-center -mt-6">
      <div class="w-32 h-32 bg-gray-400 rounded-md">
        {{ order.pickup_code }}
      </div>
    </div>
    <div class="text-white">Order Comment</div>
    <div>{{ order.order_comment || "No Comment" }}</div>
    <div class="text-white">Order products:</div>
    <template v-for="orderProduct in order.order_products" :key="orderProduct.name">
      <div>{{ orderProduct.product.name }}</div>
    </template>
    <div class="text-white">Creation Time</div>
    <div>{{ order.created }}</div>
    <div class="text-white">Full ID</div>
    <div>{{ order.id }}</div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { OrderService } from "@/services/order.service";
import { useWebsockets } from "@/composable/useWebsockets";
import { WS_URL } from "@/utils/config";

const route = useRoute();
const id = route.params.orderId;

const { data = {} } = await OrderService.get(id);

const order = ref(data);

const { lastMessage } = useWebsockets(WS_URL);

watch(lastMessage, (currentValue) => {
  if (currentValue.type === "order.notification") {
    handleOrderUpdate(currentValue.data);
  }
});

const handleOrderUpdate = (updatedOrder) => {
  if (updatedOrder.id === order.value.id) {
    order.value = updatedOrder;
  }
};
</script>
