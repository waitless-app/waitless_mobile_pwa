<template>
  <div class="flex flex-col mt-10 relative">
      <div class="bg-gray-800 rounded-lg p-4">
            <div class="bg-gray-600 h-40 rounded-lg bg-cover bg-center" :style="{ 'background-image': `url(${menu.data[0].premises.image})` }">
            </div>
        <div class="text-white mt-4 font-bold">
          {{ menu.data[0].premises.name }}
        </div>
        <div class="text-white font-medium my-1">
          {{ menu.data[0].premises.description }}
        </div>
        <div class="text-gray-400">
          <AppIcon icon="locationMarker" class="pb-1"/> {{ premisesAddress }}
        </div>
      </div>
    <div class="bg-black mt-4 -mx-5 p-5 rounded-t-lg grow">
      <div class="flex justify-start text-white font-bold">
      <div>All Products</div>
    </div>
      <div>
       <ul class="flex flex-col mt-4">
         <template v-for="product in menu.data[0].products" :key="product.name">
           <ProductCard :name="product.name" :description="product.description" :image="product.image" @click="handleProductClick(product)">
             <AppBadge>{{ product.price }} PLN</AppBadge>
           </ProductCard>
         </template>
         </ul>
      </div>
    </div>
    <div class="fixed bottom-20 right-0 float-left flex mr-4">
              <button class="rounded-full w-16 h-16 bg-gray-800 text-center drop-shadow-xl" @click="toggleCartVisibility">
                <AppIcon class="text-green-400" icon="cart" />
              </button>
              <div class="right-0 absolute rounded-full w-6 h-5 bg-white inline-block flex justify-center items-center">
                <span href="#" class="inline-block rounded-full bg-white border-4 border-green-400 p-1 text-xs">{{ cart.length }}</span>
              </div>
            </div>
  </div>
  <CartModal v-if="isVisible" @order:create="handleOrderCreate"></CartModal>
</template>
<script setup>
import { useRoute } from 'vue-router';
import {
  computed, ref, watch,
} from 'vue';
import { MenuService } from '../../services/api.service';
import AppBadge from '@/components/atoms/AppBadge.vue';
import ProductCard from '@/components/organisms/ProductCard.vue';
import AppIcon from '@/components/atoms/AppIcon.vue';
import CartModal from '@/components/pages/Cart.vue';
import { WS_URL } from '../../utils/config';
import { useCart } from '../../composable/useCart';
import { useWebsockets } from '../../composable/useWebsockets';

const route = useRoute();
const {
  isVisible, addToCart, toggleCartVisibility, cart,
} = useCart();

const { lastMessage, sendMessage } = useWebsockets(WS_URL);

const id = route.params.premisesId;

watch(lastMessage, (currentValue, oldValue) => {
  console.log(currentValue);
  console.log(oldValue);
});

const menu = ref(await MenuService.get(id));

const premisesAddress = computed(() => {
  const { premises } = menu.value.data[0];
  return `${premises.country}, ${premises.city}, ${premises.address}`;
});

const handleOrderCreate = () => {
  const payload = {
    type: 'create.order',
    data: {
      status: 'REQUESTED',
      customer: 35,
      premises: id,
      order_products: cart.value.map((product) => product.id),
    },
  };
  console.log(payload);
  sendMessage(payload);
};

const handleProductClick = (product) => {
  addToCart(product);
};

</script>

<style scoped>

</style>
