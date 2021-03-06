<template>
  <div class="flex flex-col mt-10 relative min-h-screen">
    <div class="bg-gray-800 rounded-lg p-4">
      <div
        class="bg-gray-600 h-40 rounded-lg bg-cover bg-center"
        :style="{ 'background-image': `url(${menu.premises.image})` }"
      ></div>
      <div class="text-white mt-4 font-bold">
        {{ menu.premises.name }}
      </div>
      <div class="text-white font-medium my-1">
        {{ menu.premises.description }}
      </div>
      <div class="text-gray-400">
        <AppIcon icon="locationMarker" class="pb-1" /> {{ premisesAddress }}
      </div>
    </div>
    <div class="bg-black mt-4 -mx-5 p-5 rounded-t-lg flex-grow">
      <div class="flex justify-start text-white font-bold">
        <div>All Products</div>
      </div>
      <div>
        <ul class="flex flex-col mt-4">
          <template v-for="product in menu.products" :key="product.name">
            <ProductCard
              :name="product.name"
              :description="product.description"
              :image="product.image"
              @click="handleProductClick(product)"
            >
              <AppBadge>{{ product.price }} PLN</AppBadge>
            </ProductCard>
          </template>
        </ul>
      </div>
    </div>
    <div class="fixed bottom-20 right-0 float-left flex mr-4">
      <button
        class="rounded-full w-16 h-16 bg-gray-800 text-center drop-shadow-xl"
        @click="toggleCartVisibility"
      >
        <AppIcon class="text-green-400" icon="cart" />
      </button>
      <div
        class="right-0 absolute rounded-full w-6 h-5 bg-white inline-block flex justify-center items-center"
      >
        <span class="inline-block rounded-full bg-white border-4 border-green-400 p-1 text-xs">
          {{ cart.length }}
        </span>
      </div>
    </div>
  </div>
  <Cart v-if="isVisible" @order:create="handleOrderCreate" />
  <MenuOrderConfirmation
    :show="showOrderConfirmation"
    @close="showOrderConfirmation = false"
    :image="menu.premises.image"
  />
</template>
<script setup>
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { useCart } from "../../composable/useCart";
import { useWebsockets } from "../../composable/useWebsockets";
import { MenuService } from "../../services/api.service";
import { WS_URL } from "../../utils/config";
import AppBadge from "@/components/atoms/AppBadge.vue";
import AppIcon from "@/components/atoms/AppIcon.vue";
import ProductCard from "@/components/organisms/ProductCard.vue";
import Cart from "@/components/organisms/MenuCart.vue";
import MenuOrderConfirmation from "@/components/organisms/MenuOrderConfirmation.vue";

const route = useRoute();
const id = route.params.premisesId;

const { isVisible, addToCart, toggleCartVisibility, cart, clearCart } = useCart();

const { lastMessage, sendMessage } = useWebsockets(WS_URL);

const toast = useToast();

watch(lastMessage, (currentValue) => {
  if (currentValue.type === "create.order") {
    handleOrderCreated(currentValue.data);
  }
  if (currentValue.type === "order.notification") {
    handleOrderUpdate(currentValue.data);
  }
  if (currentValue.type === "order.error") {
    handleOrderError(currentValue.data);
  }
});

const showOrderConfirmation = ref(false);
const order = ref({});

const handleOrderCreate = () => {
  const payload = {
    type: "create.order",
    data: {
      status: "REQUESTED",
      customer: 35,
      premises: id,
      order_products: mapOrderProducts(cart.value),
    },
  };
  order.value = payload.data;
  sendMessage(payload);
};

const mapOrderProducts = (orderProducts) =>
  orderProducts.map(({ quantity, product }) => ({ product: product.id, quantity }));

const handleOrderUpdate = (updatedOrder) => {
  toast(`Order ${updatedOrder.id} updated!`);
};

const handleOrderCreated = () => {
  // Reset cart
  isVisible.value = false;
  showOrderConfirmation.value = true;
  clearCart();
};
const handleOrderError = (error) => {
  toast.warning(error);
};

const handleProductClick = (product) => {
  addToCart(product);
};
const { data = [] } = await MenuService.get(id);
const menu = ref(data[0]);

const premisesAddress = computed(() => {
  const { premises } = menu.value;
  return `${premises.country}, ${premises.city}, ${premises.address}`;
});
</script>
