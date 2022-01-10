import { computed, ref } from 'vue';

const isVisible = ref(false);
const cart = ref([]);

export function useCart() {
  const toggleCartVisibility = () => {
    console.log('click');
    isVisible.value = !isVisible.value;
  };

  const addToCart = (product) => {
    cart.value.push(product);
    console.log(cart.value);
  };

  const totalPrice = computed(() => {
    let price = 0.00;
    cart.value.forEach((product) => { price += Number(product.price); });
    return price;
  });

  return {
    isVisible, cart, toggleCartVisibility, addToCart, totalPrice,
  };
}

export default useCart();
