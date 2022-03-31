<template>
  <section class="bottom-navigation block fixed inset-x-0 bottom-0 z-10 bg-gray-900 shadow py-3">
    <div id="tabs" class="flex justify-between">
      <button
        href="#"
        class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        v-for="item in menu"
        :key="item.view"
        @click="pushRoute(item.routeName)"
      >
        <AppIcon class="text-green-400" :icon="item.icon" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import AppIcon from "@/components/atoms/AppIcon.vue";

const router = useRouter();

const pushRoute = (route) => {
  router.push({ name: route });
};
const menu = [
  {
    view: "Home",
    icon: "home",
    routeName: "Premises",
  },
  {
    view: "Orders",
    icon: "clipboardList",
    routeName: "Order",
  },
  {
    view: "Profile",
    icon: "user",
    routeName: "Profile",
  },
];
</script>
<style scoped>
.bottom-navigation {
  box-shadow: 0px -6px 20px 0px #0202022e;
}
</style>
