<template>
  <div class="text-white text-2xl mb-4">Collect Order</div>
  <div class="flex flex-col">
    <div class="border-gray-400 flex flex-row mb-2">
      <div
        class="select-none cursor-pointer rounded-md flex flex-1 justify-between p-4 bg-gray-800 h-36"
      >
        <div>
          <div class="text-white">{{ order.premises.name }}</div>
          <div class="text-gray-500 text-sm">Order #{{ order.id.slice(0, 4) }}</div>
        </div>
        <div class="text-right text-white text-xs mt-1">
          <div>Status</div>
          <div class="" :class="['text-sm font-bold', statusColors[order.status]['text']]">
            {{ order.status }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center -mt-12">
      <div class="w-36 h-36 bg-gray-700 rounded-xl">
        <div class="p-4" v-if="!order.pickup_code">
          <img
            :class="order.status !== 'COMPLETED' ? 'animate-pulse' : ''"
            src="../../assets/logo_round.png"
            alt=""
          />
        </div>
        <div v-else class="p-2 text-white break-words text-6xl text-center font-bold">
          {{ order.pickup_code }}
        </div>
      </div>
    </div>
    <div class="text-white mt-8">Order Comment</div>
    <div class="text-gray-200 text-sm">{{ order.order_comment || "No Comment" }}</div>
    <div class="text-white mt-4">Order products:</div>
    <template v-for="orderProduct in order.order_products" :key="orderProduct.name">
      <div class="text-gray-200 text-sm">
        {{ orderProduct.product.name }} <span class="ml-2">x{{ orderProduct.quantity }}</span>
      </div>
    </template>
    <div class="text-white mt-4">Creation Time</div>
    <div class="text-gray-200 text-sm">{{ order.created }}</div>
    <div class="text-white mt-4">Full ID</div>
    <div class="text-gray-200 text-sm">{{ order.id }}</div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { OrderService } from "@/services/order.service";
import { useWebsockets } from "@/composable/useWebsockets";
import { WS_URL } from "@/utils/config";
import { statusColors } from "@/utils/constants";

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
