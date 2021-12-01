<template>
  <div class="w-full h-screen">
    <!-- <section id="bottom-navigation" class="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile-->
    <section
      id="bottom-navigation"
      class="block fixed inset-x-0 bottom-0 z-10 bg-gray-900 shadow"
    >
      <div
        id="tabs"
        class="flex justify-between"
      >
        <a
          href="#"
          class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
          v-for="item in menu" :key="item.view"
          @click="pushRoute(item.routeName)"
        >
          <span :class="['tab tab-home block text-xs', routeName === item.routeName ? 'text-black' : 'text-white']">{{ item.view }}</span>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'NavBottom',
  setup() {
    const { name } = useRoute();
    const router = useRouter();

    const pushRoute = (route) => {
      router.push({ name: route });
    };
    const menu = [
      {
        view: 'Home',
        icon: 'home',
        routeName: 'Home',
      },
      {
        view: 'Orders',
        icon: 'order',
        routeName: 'Home',
      },
      {
        view: 'Profile',
        icon: 'profile',
        routeName: 'Home',
      },

    ];
    return { menu, routeName: name, pushRoute };
  },
};
</script>

<style scoped></style>
