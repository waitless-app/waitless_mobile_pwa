<template>
  <!-- <section id="bottom-navigation" class="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile-->
  <section
    id="bottom-navigation"
    class="block fixed inset-x-0 bottom-0 z-10 bg-gray-900 shadow py-3"
  >
    <div id="tabs" class="flex justify-between">
      <button
        href="#"
        class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        v-for="item in menu"
        :key="item.view"
        @click="pushRoute(item.routeName)"
      >
        <AppIcon class="text-green-400" :icon="item.icon" />
        <span
          v-if="false"
          :class="[
            'tab tab-home block text-xs',
            routeName === item.routeName ? 'text-green-400' : 'text-green-500',
          ]"
          >{{ item.view }}</span
        >
      </button>
    </div>
  </section>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import AppIcon from "@/components/atoms/AppIcon.vue";

export default {
  name: "NavBottom",
  components: {
    AppIcon,
  },
  setup() {
    const { name } = useRoute();
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
        routeName: "Home",
      },
    ];
    return { menu, routeName: name, pushRoute };
  },
};
</script>

<style scoped>
#bottom-navigation {
  box-shadow: 0px -6px 20px 0px #0202022e;
}
</style>
