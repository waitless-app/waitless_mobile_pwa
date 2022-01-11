import { computed, ref } from "vue";

const isVisible = ref(false);
const cart = ref([]);

export function useCart() {
  const toggleCartVisibility = () => {
    isVisible.value = !isVisible.value;
  };

  const inCartProductIndex = (productId) =>
    cart.value.findIndex(({ product }) => product.id === productId);

  const addToCart = (product) => {
    const cartProduct = {
      product,
      quantity: 1,
    };

    const productIndex = inCartProductIndex(product.id);

    if (productIndex === -1) {
      cart.value.push(cartProduct);
    } else {
      cart.value[productIndex].quantity += 1;
    }
  };

  const totalPrice = computed(() => {
    let price = 0.0;
    cart.value.forEach(({ product }) => {
      price += Number(product.price);
    });
    return price;
  });

  return {
    isVisible,
    cart,
    toggleCartVisibility,
    addToCart,
    totalPrice,
  };
}

export default useCart();
