<template>
  <div class="flex flex-col mt-10">
      <div class="bg-gray-800 h-40 rounded-lg p-4">
        <div class="text-white">
          {{ menu.data[0].premises.name }}
        </div>
            <div class="w-100 h-36 content-image" />
      </div>
    <div class="bg-black mt-4">
      <div class="flex justify-start text-white font-bold my-4">
      <div class="mx-2">All Products</div>
    </div>
      <div>
         <template v-for="product in menu.data[0].products" :key="product.name">
              <div class="h-12 text-white block my-4" @click="handleProductClick(product)" @keydown="handleProductClick(product)">
                  <span>{{ product.name }}</span>
                  <AppBadge>{{ product.price }}</AppBadge>
              </div>
         </template>
      </div>
    </div>
  </div>
              <div class="relative float-left mr-2 flex">
              <button class="rounded-full w-16 h-16 bg-green-200 text-center" @click="toggleCartVisibility">
                <AppIcon icon="cart"></AppIcon>
              </button>
              <div class="right-0 absolute rounded-full w-5 h-5 bg-white inline-block flex justify-center items-center">
                <span href="#" class="inline-block rounded-full bg-white border-4 border-purple-400 p-1 text-xs"></span>
              </div>
            </div>
  <CartModal v-if="isVisible" @order:create="handleOrderCreate"></CartModal>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { MenuService } from '../../services/api.service';
import AppBadge from '@/components/atoms/AppBadge.vue';
import AppIcon from '@/components/atoms/AppIcon.vue';
import CartModal from '@/components/organisms/CartModal.vue';
import { useCart } from '../../composable/useCart';
import { WS_URL } from '../../utils/config';

const route = useRoute();
const {
  isVisible, addToCart, toggleCartVisibility,
} = useCart();

const id = route.params.premisesId;

const menu = ref(await MenuService.get(id));

const socket = new WebSocket(WS_URL);

const handleOrderCreate = () => {
  // const payload = {
  //   type: 'create.order',
  //   data: {
  //     status: 'REQUESTED',
  //     customer: 35,
  //     premises: id,
  //     products: cart.value.map((product) => product.id),
  //   },
  // };
  const payload = {
    type: 'create.order',
    data: {
      status: 'REQUESTED',
      customer: 35,
      premises: 1,
      order_products: [
        1,
      ],
    },
  };
  socket.send(JSON.stringify(payload));
};

const handleProductClick = (product) => {
  addToCart(product);
};

</script>

<style scoped>

</style>
